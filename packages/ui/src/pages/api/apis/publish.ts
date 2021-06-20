import { VercelRequest, VercelResponse } from '@vercel/node'
import { checkContentIsValid } from '../../../api/services/ens'
import { withValidatePublishBody } from '../../../api/helpers'
import { Api } from '../../../api/models/Api'
import { ApiData } from '../../../api/models/types'

export default withValidatePublishBody(
  async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === 'POST') {
      try {
        const apiInfo: ApiData = {
          // ownerId: request.session.user.id,
          ...request.body,
        }

        const { locationUri, pointerUris } = apiInfo
        const { valid, message } = await checkContentIsValid(pointerUris, locationUri)

        if (valid) {
          const api = await Api.create(apiInfo)
          return response.json({ status: 200, api })
        }

        return response.json({
          status: 406,
          error: message,
        })
      } catch (error) {
        response.json({ status: 500, error: error.message })
      }
    }
  },
)
