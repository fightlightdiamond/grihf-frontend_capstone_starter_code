import {createContext} from "react";
import {TUser} from "../../abstracts/types";

export type TAuthContext = {
    authState: null | TUser,
    isUserAuthenticated: () => boolean,
    login(email: string, password: string): void,
    logout(): void
}

export const AuthContext = createContext<TAuthContext>({
    authState: null,
    isUserAuthenticated: () => false,
    login() {},
    logout(){}
});