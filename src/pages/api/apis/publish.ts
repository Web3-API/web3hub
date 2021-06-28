import { VercelRequest, VercelResponse } from '@vercel/node'
import { checkContentIsValid } from '../../../api/services/ens'
import { withValidatePublishBody } from '../../../api/helpers'
import { Api } from '../../../api/models/Api'
import { ApiData } from '../../../api/models/types'

const md5 = require('md5')

export default withValidatePublishBody(
  async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === 'POST') {
      try {
        // User will send id from ceramic
        // We will hash it and check that the user exists
        const ownerId = md5(request.body.did)
        const apiInfo: ApiData = {
          ownerId,
          ...request.body,
        }

        const { locationUri, pointerUris } = apiInfo

        // @TODO: Remove checkContentIsValid method
        // and use Web3Api Client instead
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
