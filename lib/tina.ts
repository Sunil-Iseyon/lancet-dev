// Unified client that works with both local files and Tina Cloud
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"

// Dynamic import for Tina Cloud client (only when needed)
let tinaClient: any = null

async function getTinaClient() {
  if (!tinaClient && !isLocal) {
    try {
      const clientModule = await import("../tina/__generated__/client")
      tinaClient = clientModule.default
      return tinaClient
    } catch (error) {
      console.error("Tina client not available, falling back to local mode:", error)
      return null
    }
  }
  return tinaClient
}

// Helper function to parse markdown to TinaMarkdown rich-text format
function parseMarkdownToRichText(markdown: string): any {
  const lines = markdown.split('\n')
  const children: any[] = []
  let currentParagraph: string[] = []
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join('\n').trim()
      if (text) {
        children.push({
          type: 'p',
          children: parseInlineMarkdown(text)
        })
      }
      currentParagraph = []
    }
  }
  
  for (const line of lines) {
    // Handle headings
    if (line.startsWith('### ')) {
      flushParagraph()
      children.push({
        type: 'h3',
        children: [{ type: 'text', text: line.substring(4).trim() }]
      })
    } else if (line.startsWith('## ')) {
      flushParagraph()
      children.push({
        type: 'h2',
        children: [{ type: 'text', text: line.substring(3).trim() }]
      })
    } else if (line.startsWith('# ')) {
      flushParagraph()
      children.push({
        type: 'h1',
        children: [{ type: 'text', text: line.substring(2).trim() }]
      })
    } else if (line.trim() === '') {
      // Empty line - flush current paragraph
      flushParagraph()
    } else {
      // Regular text line
      currentParagraph.push(line)
    }
  }
  
  // Flush any remaining paragraph
  flushParagraph()
  
  return {
    type: 'root',
    children: children.length > 0 ? children : [
      { type: 'p', children: [{ type: 'text', text: '' }] }
    ]
  }
}

// Helper to parse inline markdown (bold, italic, links)
function parseInlineMarkdown(text: string): any[] {
  const children: any[] = []
  let currentText = ''
  let i = 0
  
  while (i < text.length) {
    // Handle bold **text**
    if (text[i] === '*' && text[i + 1] === '*') {
      if (currentText) {
        children.push({ type: 'text', text: currentText })
        currentText = ''
      }
      i += 2
      let boldText = ''
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '*')) {
        boldText += text[i]
        i++
      }
      if (boldText) {
        children.push({ type: 'text', text: boldText, bold: true })
      }
      i += 2
    }
    // Handle italic *text*
    else if (text[i] === '*') {
      if (currentText) {
        children.push({ type: 'text', text: currentText })
        currentText = ''
      }
      i++
      let italicText = ''
      while (i < text.length && text[i] !== '*') {
        italicText += text[i]
        i++
      }
      if (italicText) {
        children.push({ type: 'text', text: italicText, italic: true })
      }
      i++
    } else {
      currentText += text[i]
      i++
    }
  }
  
  if (currentText) {
    children.push({ type: 'text', text: currentText })
  }
  
  return children.length > 0 ? children : [{ type: 'text', text: text }]
}

// Helper to read JSON files
function readJSONFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(content)
    const filename = path.basename(filePath, ".json")
    return { ...data, _sys: { filename } }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

// Helper to read all JSON files from a directory
function readJSONDirectory(dirPath: string) {
  try {
    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".json"))
    return files.map((file) => readJSONFile(path.join(dirPath, file))).filter(Boolean)
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return []
  }
}

// Helper to read MDX files
function readMDXDirectory(dirPath: string) {
  try {
    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    return files.map((file) => {
      const filePath = path.join(dirPath, file)
      const content = fs.readFileSync(filePath, "utf-8")
      const { data, content: bodyContent } = matter(content)
      const filename = path.basename(file, path.extname(file))
      
      // Return markdown string as body (will be rendered with ReactMarkdown)
      return { ...data, body: bodyContent, _sys: { filename } }
    })
  } catch (error) {
    console.error(`Error reading MDX directory ${dirPath}:`, error)
    return []
  }
}

// Helper to read mixed format directories (both MDX and JSON)
function readMixedDirectory(dirPath: string) {
  try {
    const files = fs.readdirSync(dirPath)
    return files.map((file) => {
      const filePath = path.join(dirPath, file)
      
      if (file.endsWith(".json")) {
        // Read JSON file
        return readJSONFile(filePath)
      } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
        // Read MDX/MD file
        const content = fs.readFileSync(filePath, "utf-8")
        const { data, content: bodyContent } = matter(content)
        const filename = path.basename(file, path.extname(file))
        return { ...data, body: bodyContent, _sys: { filename } }
      }
      return null
    }).filter(Boolean)
  } catch (error) {
    console.error(`Error reading mixed directory ${dirPath}:`, error)
    return []
  }
}

export async function getBlogPosts() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "blog")
    const posts = readMixedDirectory(contentPath)
    // Sort by date in descending order (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = (a as any).date ? new Date((a as any).date).getTime() : 0
      const dateB = (b as any).date ? new Date((b as any).date).getTime() : 0
      return dateB - dateA
    })
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const postsResponse = await client.queries.blogConnection()
    const posts = postsResponse.data.blogConnection.edges?.map((edge: any) => edge?.node) || []
    // Sort by date in descending order (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
  }
  return []
}

export async function getBlogPost(relativePath: string) {
  if (isLocal) {
    const filePath = path.join(process.cwd(), "content", "blog", `${relativePath}.json`)
    try {
      const content = fs.readFileSync(filePath, "utf-8")
      const data = JSON.parse(content)
      
      return { ...data, _sys: { filename: relativePath } }
    } catch (error) {
      console.error(`Error reading blog post ${relativePath}:`, error)
      return null
    }
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    try {
      // Ensure relativePath has .json extension for Tina Cloud
      const pathWithExtension = relativePath.endsWith('.json') ? relativePath : `${relativePath}.json`
      const postResponse = await client.queries.blog({ relativePath: pathWithExtension })
      return postResponse.data.blog
    } catch (error) {
      console.error(`Error fetching blog post ${relativePath}:`, error)
      return null
    }
  }
  return null
}

export async function getTestimonials() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "testimonials")
    return readJSONDirectory(contentPath)
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const testimonialsResponse = await client.queries.testimonialConnection()
    return testimonialsResponse.data.testimonialConnection.edges?.map((edge: any) => edge?.node) || []
  }
  return []
}

export async function getServices() {
  const allPages = await getPages()
  // Filter pages that have showInServiceSection enabled
  return allPages.filter((page: any) => page.showInServiceSection === true)
}

export async function getPartners() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "partners")
    return readJSONDirectory(contentPath)
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const partnersResponse = await client.queries.partnerConnection()
    return partnersResponse.data.partnerConnection.edges?.map((edge: any) => edge?.node) || []
  }
  return []
}

export async function getFeatures() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "features")
    return readJSONDirectory(contentPath)
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const featuresResponse = await client.queries.featureConnection()
    return featuresResponse.data.featureConnection.edges?.map((edge: any) => edge?.node) || []
  }
  return []
}

export async function getStats() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "stats")
    return readJSONDirectory(contentPath)
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const statsResponse = await client.queries.statConnection()
    return statsResponse.data.statConnection.edges?.map((edge: any) => edge?.node) || []
  }
  return []
}

export async function getPages() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "pages")
    const pages = readMDXDirectory(contentPath)
    // Sort by date in descending order (newest first) if date field exists
    return pages.sort((a: any, b: any) => {
      const dateA = (a as any).date ? new Date((a as any).date).getTime() : 0
      const dateB = (b as any).date ? new Date((b as any).date).getTime() : 0
      return dateB - dateA
    })
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const pagesResponse = await client.queries.pageConnection()
    const pages = pagesResponse.data.pageConnection.edges?.map((edge: any) => edge?.node) || []
    // Sort by date in descending order (newest first) if date field exists
    return pages.sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
  }
  return []
}

export async function getPage(slug: string) {
  if (isLocal) {
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.mdx`)
    try {
      const content = fs.readFileSync(filePath, "utf-8")
      const { data, content: bodyContent } = matter(content)
      
      // Return raw markdown content instead of parsing
      return { ...data, body: bodyContent, _sys: { filename: slug } }
    } catch (error) {
      return null
    }
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    try {
      const pageResponse = await client.queries.page({ relativePath: `${slug}.mdx` })
      // For Tina Cloud, we might need to convert rich-text back to markdown
      // For now, return as is - will need adjustment based on your Tina setup
      return pageResponse.data.page
    } catch (error) {
      console.error(`Error fetching page ${slug}:`, error)
      return null
    }
  }
  return null
}

export async function getPagesByCategory(category: string) {
  const allPages = await getPages()
  return allPages.filter((page: any) => page.category === category)
}

// Helper to get slug from page data (uses filename from _sys)
export function getPageSlug(page: any): string {
  return page._sys?.filename || ""
}

export async function getJobOpenings() {
  if (isLocal) {
    const contentPath = path.join(process.cwd(), "content", "job-openings")
    return readJSONDirectory(contentPath)
  }
  
  // Use Tina Cloud
  const client = await getTinaClient()
  if (client) {
    const jobOpeningsResponse = await client.queries.jobOpeningConnection()
    return jobOpeningsResponse.data.jobOpeningConnection.edges?.map((edge: any) => edge?.node) || []
  }
  return []
}
