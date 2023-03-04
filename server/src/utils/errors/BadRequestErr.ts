import ApiErr from "./ApiErr";

export default class BadRequestErr extends ApiErr {
  constructor(message: string) {
    const status = ApiErr.statuses.BadRequest;
    super(status, message);
  }
}