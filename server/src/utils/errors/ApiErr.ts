import { statuses } from ".";

export default class ApiErr extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }

  static statuses = statuses;
}