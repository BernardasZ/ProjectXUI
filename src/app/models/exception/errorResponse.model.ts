export class ErrorResponse {
  error?: Error;
  message?: string;
  name?: string;
  ok?: boolean;
  status?: number;
  statusText?: string;
  url?: string;
}

export interface Error {
  errors?: any;
}