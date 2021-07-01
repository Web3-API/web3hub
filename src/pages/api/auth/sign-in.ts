import { VercelRequest, VercelResponse } from '@vercel/node'
import { User } from '../../../api/models/User'

const md5 = require("md5");

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    const { did } = request.body;
    const hashedDid = md5(did);
    try {
      await User.findOrCreate(hashedDid);
      return response.json({
        status: 200,
      });
    } catch (error) {
      response.json({
        status: 500,
        error: error.message,
      });
    }
  }
}
