import { AxiosError } from "axios";

export interface ServerResponse<T = undefined> {
  message: string;
  code: number;
  data: T;
}

interface ServerError {
  error: string;
  code: number;
}

export interface ServerErrorResponse extends AxiosError<ServerError> {}
