import { Request, Response, Router } from "express";

import { Api } from "../models/Api";
import { ApiData } from "../models/types";
import { checkContentIsValid } from "../services/ens";
import { validatePublishBody } from "./helpers";

const router = Router();

const publishApi = async (request: Request, response: Response) => {
  try {
    // User will send id from ceramic
    // We will hash it and check that the user exists
    const ownerId = request.body.did;
    const apiInfo: ApiData = {
      ownerId,
      ...request.body,
    };

    const { locationUri, pointerUris } = apiInfo;

    // @TODO: Remove checkContentIsValid method
    // and use Web3Api Client instead
    const { valid, message } = await checkContentIsValid(
      pointerUris,
      locationUri
    );

    if (valid) {
      const api = await Api.create(apiInfo);
      return response.json({ status: 200, api });
    }

    return response.json({
      status: 406,
      error: message,
    });
  } catch (error) {
    response.json({ status: 500, error: error.message });
  }
};

const getAll = async (_: Request, response: Response) => {
  try {
    const apis = await Api.getAllActive();
    return response.json({
      status: 200,
      apis,
    });
  } catch (error) {
    return response.json({ status: 500, error: error.message });
  }
};

const getApiByName = async (request: Request, response: Response) => {
  try {
    // @TODO: Add dynamic param visible
    const apis = await Api.get(request.params.name.toLowerCase());
    return response.json({
      status: 200,
      apis,
    });
  } catch (error) {
    return response.json({ status: 500, error: error.message });
  }
};

export const checkAndUpdateApis = async () => {
  try {
    const apis = await Api.getAllActive();

    apis.forEach(async (api: ApiData) => {
      const { valid } = await checkContentIsValid(
        api.pointerUris,
        api.locationUri
      );
      if (!valid) Api.deactivate(api.id);
    });
  } catch (e) {
    console.log("Error when checking and updating apis -> ", e.message);
  }
};

export const getApiByLocation = async (
  request: Request,
  response: Response
) => {
  try {
    const { location, name } = request.params;
    const api = await Api.getByLocation(location, name);
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

router.get("/active", getAll);
router.get("/find/:name", getApiByName);
router.get("/find/:location/:name", getApiByLocation);
router.post("/publish", validatePublishBody, publishApi);

export { router as ApiController };
