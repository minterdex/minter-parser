import { Response } from "express";
import * as winston from "winston";
import { Config } from "./Config";
const axios = require("axios");

/**
 * Fills the status and JSOn data into a response object.
 * @param res response object
 * @param status of the response
 * @param content of the response
 */
export function sendJSONresponse(res: Response, status: number, content: any) {
    res.status(status);
    res.json(content);
}