// using an enum because it can be used both as a value and a type
export enum Statuses {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServer = 500
}

export default class ApiErr extends Error {
  static statuses = Statuses;

  protected constructor(
    public readonly status: Statuses,
    message: string
  ) {
    super(message);
  }
}