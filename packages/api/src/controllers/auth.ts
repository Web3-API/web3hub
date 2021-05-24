import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";

import { User } from "../models/User";
import { ghCallback } from "../services/github/strategy";

const router = Router();

//@TODO: Make sure this is the best approach
const domain = process.env.HOST || "http://localhost:3000";

const checkAccessToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const auth = request.headers.authorization || "";
  const isAuthed = auth.includes("token");
  if (!isAuthed) {
    return response.json({
      status: 404,
      message: "Authorization header is missing",
    });
  }

  if (!request.session.user) {
    return response.json({
      status: 404,
      message: "You must log in",
    });
  }

  const [_, token] = auth.split(" ");
  request.accessToken = token;
  return next();
};

const checkRedirectUri = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { redirectUrl } = request.query;
  if (redirectUrl) {
    request.redirectUrl = redirectUrl as string;
    return next();
  }
  return response.json({
    status: 400,
    message: "Redirect URL has not been sent",
  });
};

const handleSignIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { address, authType } = request.query;
  try {
    if (address) {
      // @TODO: Improve this
      const user = await User.findOrCreateByAddress({
        address: address as string,
        authType: Number(authType) || 1,
      });
      return response.json({
        status: 200,
        user,
      });
    }
  } catch (error) {
    response.json({
      status: 500,
      error: error.message,
    });
  }

  return next();
};

const authHandler = async (request: Request, response: Response) => {
  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: request.params.code,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const codeRequest = await axios.post(
    "https://github.com/login/oauth/access_token",
    data,
    config
  );

  if ("error" in codeRequest.data) {
    return response.json({
      status: 503,
      message: codeRequest.data.error,
    });
  }

  try {
    const user = await ghCallback(codeRequest.data.access_token);
    request.session.user = user;
    return response.json({
      status: 200,
      ...codeRequest.data,
    });
  } catch (e) {
    return response.json({
      status: 503,
      error: e.message,
    });
  }
};

router.get("/sign-in", handleSignIn);
router.get("/github/callback/:code", authHandler);
router.get("/sign-out", (request: Request, response: Response) => {
  request.logout();
  response.json({ status: 200 });
});

export { checkAccessToken, router as AuthController };
