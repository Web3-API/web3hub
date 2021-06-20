import { VercelRequest, VercelResponse } from "@vercel/node"
import { Api } from "../../../../../api/models/Api"

export default async (request: VercelRequest, response: VercelResponse) => {
  if(request.method === "GET") {
    try {
      const { location, name } = request.query
      const api = await Api.getByLocation(location as string, name as string)
      return response.json({
        status: 200,
        api,
      })
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      })
    }
  }
}
