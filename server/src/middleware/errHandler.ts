import { NextFunction, Request, Response } from "express";
import { TApiErrors } from "../utils/errors";
import ApiErr, { Statuses } from "../utils/errors/ApiErr";
import { MongoError } from "mongodb";

type TError = TApiErrors | Error | MongoError;
type TMongoErrCode = number | string | undefined;

interface IMongoDuplicateErr {
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


export default class ErrHandler {
  private constructor() {};

  private static errObject: IErrObject = { message: "" }
  private static err: TApiErrors | Error | MongoError;
  private static statusCode: Statuses = Statuses.InternalServer;
  private static mongoErrCode: TMongoErrCode;

  static handle(
    err: TError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    ErrHandler.setupStaticProperties(err);
    ErrHandler.detectErrTypeAndHandle();
    ErrHandler.sendErr(res);
  }

  private static setupStaticProperties(err: TError) {
    ErrHandler.err = err;
    ErrHandler.errObject = { message: ErrHandler.err.message };
    ErrHandler.statusCode = Statuses.InternalServer;
    ErrHandler.mongoErrCode = undefined;
  }

  private static detectErrTypeAndHandle() {
    const err = ErrHandler.err;
    if (err instanceof ApiErr) ErrHandler.handleApiErr();
    else if (err instanceof MongoError) ErrHandler.handleMongoErr();
    else ErrHandler.handleInternalServerErr();
  }

  private static handleApiErr() {
    ErrHandler.statusCode = ((ErrHandler.err as TApiErrors).status);
  }

  private static handleMongoErr() {
    ErrHandler.statusCode = Statuses.BadRequest;
    ErrHandler.mongoErrCode = (ErrHandler.err as MongoError).code;

    const duplicateErrCode = 11000;
    if (ErrHandler.mongoErrCode === duplicateErrCode) {
      const duplicateErr = ErrHandler.err as IMongoDuplicateErr;
      ErrHandler.errObject.message = "duplicate key error"
      ErrHandler.errObject.duplicates = Object.keys(duplicateErr.keyValue);
    }
  }

  private static handleInternalServerErr() {
    console.error(ErrHandler.err);
    ErrHandler.errObject.message = ErrHandler.err.message;
  }

  private static sendErr(res: Response) {
    res.status(ErrHandler.statusCode);
    return res.send(ErrHandler.errObject);
  }
}
