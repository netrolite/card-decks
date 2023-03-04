import ApiErr from "./ApiErr";

export default class ForbiddenErr extends ApiErr {
  constructor(message: string) {
    const status = ApiErr.statuses.Forbidden;
    super(status, message);
  }
}