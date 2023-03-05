import BadRequestErr from "./BadRequestErr";
import UnauthorizedErr from "./UnauthorziedErr";
import ForbiddenErr from "./ForbiddenErr";
import NotFoundErr from "./NotFoundErr";
import InternalServerErr from "./InternalServerErr";

export type TApiErrors = BadRequestErr | UnauthorizedErr | ForbiddenErr | NotFoundErr | InternalServerErr;

export {
  BadRequestErr,
  UnauthorizedErr,
  ForbiddenErr,
  NotFoundErr,
  InternalServerErr
}