import {EStatus} from "../../common/abstracts/enums";

export type Geo = {
    lat: string;
    lng: string;
};

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
};

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
};


export type UsersState = {
    // In `status` we will watch
    // if todos are being loaded.
    status: EStatus;

    // `error` will contain an error message.
    error: string | null;
    list: User[];
    user: User | null;
};

export type UsersError = {
    message: string;
};