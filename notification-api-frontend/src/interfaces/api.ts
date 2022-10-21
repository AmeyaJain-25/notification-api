export interface SuccessResponseInterface<DataT = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: DataT;
}

export interface ErrorResponseInterface {
  statusCode: number;
  success: boolean;
  message: string;
}

export interface ErrorsValidationInterface {
  statusCode: number;
  success: boolean;
  message: string;
  errors: string[];
}
