import type {
  TUser,
  ValidationErrorResponse,
} from '../../common/abstracts/types';
import { EStatus } from '../../common/abstracts/enums';

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type TAuthState = {
  auth: TUser | null;
  error: string | null;
  errors: ValidationErrorResponse;
  status: EStatus;
};

export type TError = {
  message: string;
};

export type AuthsError = TError | ValidationErrorResponse;

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export type UserUpdate = Partial<User>;
export type UserInfo = Pick<User, 'name' | 'email'>; // show chi lay
export type NewUser = Omit<User, 'id'>; // create loai bo id
export type RolePermissions = Record<User['role'], string[]>;
