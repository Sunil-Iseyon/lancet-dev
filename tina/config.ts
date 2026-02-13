import { defineConfig } from "tinacms"

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main"

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  contentApiUrlOverride: process.env.TINA_PUBLIC_IS_LOCAL === "true" ? "/api/tina/gql" : undefined,
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "json",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
          },
          {
            type: "string",
            name: "position",
            label: "Position/Role",
          },
          {
            type: "string",
            name: "company",
            label: "Company",            
            required: true,
          },
          {
            type: "string",
            name: "content",
            label: "Content",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "review",
            label: "Review",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "number",
            name: "rating",
            label: "Rating",
          },
        ],
      },
      {
        name: "partner",
        label: "Partners",
        path: "content/partners",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
        ],
      },
      {
        name: "feature",
        label: "Features",
        path: "content/features",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "icon",
            label: "Icon Name",
            description: "Lucide icon name",
          },
        ],
      },
      {
        name: "stat",
        label: "Statistics",
        path: "content/stats",
        format: "json",
        fields: [
          {
            type: "string",
            name: "value",
            label: "Value",
            required: true,
          },
          {
            type: "string",
            name: "label",
            label: "Label",
            required: true,
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "services", label: "Services" },
              { value: "business-intelligent", label: "Business Intelligence" },
              { value: "data-integration", label: "Data Integration" },
              { value: "data-services", label: "Data Services" },
              { value: "247-service", label: "24/7 Services" },
              { value: "engagement-modes", label: "Engagement Modes" },
              { value: "standalone", label: "Standalone Page" },
            ],
            description: "Select the category this page belongs to",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: true,
          },
          {
            type: "boolean",
            name: "showInServiceSection",
            label: "Show in Home Service Section",
            description: "Toggle to display this page in the home page services section",
          },
          {
            type: "string",
            name: "serviceDescription",
            label: "Service Card Description",
            description: "Short description for the service card on home page (required when 'Show in Home Service Section' is enabled)",
            ui: {
              component: "textarea",
              validate: (value, data) => {
                if (data.showInServiceSection && !value) {
                  return "Service Card Description is required when showing in service section"
                }
              },
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
      {
        name: "gallery",
        label: "Gallery Images",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
        ],
      },
      {
        name: "jobOpening",
        label: "Job Openings",
        path: "content/job-openings",
        format: "json",
        fields: [
          {
            type: "boolean",
            name: "isActive",
            label: "Active",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Job Title",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Employment Type",
            required: true,
            options: ["Full-time", "Part-time", "Contract", "Internship"],
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "requirements",
            label: "Requirements",
            list: true,
            required: true,
          },
        ],
      },
    ],
  },
})
