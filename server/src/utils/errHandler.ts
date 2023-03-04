import { NextFunction, Request, Response } from "express";
import { BadRequestErr, TApiErrors, statuses } from "./errors";
import ApiErr from "./errors/ApiErr";
import { MongoError } from "mongodb";

interface IDuplicateErr {
  driver: boolean,
  name: string,
  index: number,
  code: number,
  keyPattern: object,
  keyValue: object,
  $clusterTime: object,
  message: string
}

interface IErrObject {
  message: string,
  duplicates?: string[]
}

// not a class because express 
export default function errHandler(
  err: TApiErrors | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  const errObject: IErrObject = {
    message: err.message || "internal server error"
  }

  if (err instanceof ApiErr) {
    statusCode = err.status;
  } else if (err instanceof MongoError) {
    if (err.code === 11000) handleDuplicateErr();
  }

  console.error(err);
  res.status(statusCode);
  return res.send(errObject);

  function handleDuplicateErr() {
    const duplicateErr = err as IDuplicateErr;
    errObject.message = "duplicate key error"
    errObject.duplicates = Object.keys(duplicateErr.keyValue);
  }
}
