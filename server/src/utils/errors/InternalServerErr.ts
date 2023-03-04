import ApiErr from "./ApiErr";

export default class InternalServerErr extends ApiErr {
  constructor(message: string) {
    const status = ApiErr.statuses.InternalServer;
    super(status, message);
  }
}