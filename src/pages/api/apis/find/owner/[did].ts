import { VercelRequest, VercelResponse } from "@vercel/node"
import { Api } from "../../../../../api/models/Api";

const md5 = require("md5");

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const id = md5(request.query.did);
    const api = await Api.getByOwner(id);
    return response.json({
      status: 200,
      api,
    });
  } catch (error) {
    return response.json({
      status: 500,
      error: error.message,
    });
  }
};