import { VercelRequest, VercelResponse } from '@vercel/node'
import Joi from 'joi'

export function validateRequest(
  request: VercelRequest,
  response: VercelResponse,
  schema: Joi.Schema,
) {
  const options = {
    abortEarly: false,
    stripUnknown: true,
  }

  const { value, error } = schema.validate(request.body, options)
  if (error) {
    return response.json({
      status: 400,
      message: `Error(s) on body: ${error.details.map((x) => x.message).join(', ')}`,
    })
  }

  request.body = value
}

export const withValidatePublishBody = (
  fn: (
    request: VercelRequest,
    response: VercelResponse,
  ) => Promise<VercelResponse> | VercelResponse,
) => {
  return (request: VercelRequest, response: VercelResponse) => {
    console.log(request.body)
    const schema = Joi.object({
      description: Joi.string().required(),
      subtext: Joi.string().required(),
      name: Joi.string().required(),
      icon: Joi.string().required(),
      locationUri: Joi.string().required(),
      pointerUris: Joi.array().items(Joi.string()),
      did: Joi.string(),
    })
    
    validateRequest(request, response, schema)

    return fn(request, response)
  }
}

export const withAccessToken = (
  fn: (
    request: VercelRequest,
    response: VercelResponse,
    accessToken: string,
  ) => Promise<VercelResponse> | VercelResponse,
) => {
  return (request: VercelRequest, response: VercelResponse) => {
    const auth = request.headers.authorization || ''
    const isAuthed = auth.includes('token')
    if (!isAuthed) {
      return response.json({
        status: 404,
        message: 'Authorization header is missing',
      })
    }

    const [_, token] = auth.split(' ')
    return fn(request, response, token)
  }
}
