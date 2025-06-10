export type TUser = {
  id: number;
  name?: string;
  phone?: string;
  email: string;
  password: string;
  avatar: string;
};

export type ValidationError = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export type ValidationErrorResponse = ValidationError[];

// export type TStatus = EStatus.loading | EStatus.idle | EStatus.failed | EStatus.succeeded
