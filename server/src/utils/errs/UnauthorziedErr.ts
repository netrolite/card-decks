import ApiErr from "./ApiErr";

export default class UnauthorizedErr extends ApiErr {
  constructor(message: string) {
    const status = ApiErr.statuses.Unauthorized;
    super(status, message)
  }
}