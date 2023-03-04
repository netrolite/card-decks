import ApiErr from "./ApiErr";

export default class NotFoundErr extends ApiErr {
  constructor(message: string) {
    const status = ApiErr.statuses.NotFound;
    super(status, message);
  }
}