import { VercelRequest, VercelResponse } from '@vercel/node'
import { Api } from '../../../api/models/Api'

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') {
    try {
      const apis = await Api.getAllActive()
      return response.json({
        status: 200,
        apis,
      })
    } catch (error) {
      return response.json({ status: 500, error: error.message })
    }
  }
}
