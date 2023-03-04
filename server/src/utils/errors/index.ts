import BadRequestErr from "./BadRequestErr";
import UnauthorizedErr from "./UnauthorziedErr";
import ForbiddenErr from "./ForbiddenErr";
import NotFoundErr from "./NotFoundErr";
import InternalServerErr from "./InternalServerErr";

export type TApiErrors = BadRequestErr | UnauthorizedErr | ForbiddenErr | NotFoundErr | InternalServerErr;
export const statuses = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServer: 500
}

export {
  BadRequestErr,
  UnauthorizedErr,
  ForbiddenErr,
  NotFoundErr,
  InternalServerErr
}