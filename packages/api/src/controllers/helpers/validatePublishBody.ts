import { NextFunction, Request, Response } from "express";
import { object, array, string } from "joi";

import { validateRequest } from "./validateRequest";

export const validatePublishBody = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const schema = object({
    description: string().required(),
    subtext: string().required(),
    name: string().required(),
    icon: string().required(),
    locationUri: string().required(),
    pointerUris: array().items(string()),
  });

  validateRequest(request, response, next, schema);
};
