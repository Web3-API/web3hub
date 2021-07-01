import { VercelRequest, VercelResponse } from '@vercel/node'
import { Api } from '../../../../api/models/Api'

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') {
    try {
      // @TODO: Add dynamic param visible
      const apis = await Api.get((request.query.name as string).toLowerCase())
      return response.json({
        status: 200,
        apis,
      })
    } catch (error) {
      return response.json({ status: 500, error: error.message })
    }
  }
}
