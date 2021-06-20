import { VercelRequest, VercelResponse } from '@vercel/node'
import { User } from '../../../api/models/User'

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') {
    const { address, authType } = request.query
    try {
      if (address) {
        // @TODO: Improve this
        const user = await User.findOrCreateByAddress({
          address: address as string,
          authType: Number(authType) || 1,
        })
        return response.json({
          status: 200,
          user,
        })
      }
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      })
    }
  }
}
