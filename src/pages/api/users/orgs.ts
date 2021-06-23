import { VercelRequest, VercelResponse } from '@vercel/node'
import { fetchOrganizations } from '../../../api/services/github'
import { withAccessToken } from './../../../api/helpers'

export default withAccessToken(
  async (request: VercelRequest, response: VercelResponse, accessToken: string) => {
    if (request.method === 'GET') {
      if (!accessToken) {
        return response.json({
          status: 404,
          message: 'Access Token missing in Authorization header',
        })
      }

      const orgs = await fetchOrganizations(accessToken)
      return response.json({
        status: 200,
        orgs,
      })
    }
  },
)
