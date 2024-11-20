export interface Response {
  status: number;
  success: boolean;
  message: string;
}

export class SuccessResponse implements Response {
  success: boolean;
  status: number;
  message: string;
  data: Record<string, any>;
  constructor(
    message: string,
    data: Record<string, any>,
    success: boolean = true,
    status: number = 200
  ) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

// export interface SuccessResponse extends Response {
//   data: any;
// }

export interface ErrorResponse extends Response {
  errors: any;
}
