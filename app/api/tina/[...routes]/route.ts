import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { databaseRequest } = await import("../../../../tina/__generated__/databaseClient")
  
  const result = await databaseRequest({
    query: body.query,
    variables: body.variables,
    user: undefined,
  })

  return Response.json({ data: result.data, errors: result.errors })
}

export async function GET() {
  return Response.json({ message: "Tina CMS GraphQL endpoint" })
}
