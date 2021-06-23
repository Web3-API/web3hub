import { VercelRequest, VercelResponse } from '@vercel/node'
import { Schema, object, array, string } from 'joi'

export function validateRequest(
  request: VercelRequest,
  response: VercelResponse,
  schema: Schema,
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
    const schema = object({
      description: string().required(),
      subtext: string().required(),
      name: string().required(),
      icon: string().required(),
      locationUri: string().required(),
      pointerUris: array().items(string()),
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
    const auth = request.headers.authorization || "";
    const isAuthed = auth.includes("token");
    if (!isAuthed) {
      return response.json({
        status: 404,
        message: "Authorization header is missing",
      });
    }

    const [_, token] = auth.split(" ");
    return fn(request, response, token)
  }
}
