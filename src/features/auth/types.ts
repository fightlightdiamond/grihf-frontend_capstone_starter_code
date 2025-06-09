import { TUser} from "../../common/abstracts/types";
import {EStatus} from "../../common/abstracts/enums";

export type TLogin = {
    email: string,
    password: string,
}

export type TAuthState = {
    auth: TUser | null,
    error: string | null,
    status: EStatus,
};

export type AuthsError = {
    message: string;
};

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
