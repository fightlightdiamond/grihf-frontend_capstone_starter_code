import {DoctorSpecialty} from "./enum";
import {TUser} from "../../common/abstracts/types";
import {EStatus} from "../../common/abstracts/enums";

export type TDoctor = {
    id: number,
    userId: number,
    profile?: TUser
    experienceYear: number,
    rating: number,
    specialty: DoctorSpecialty,
    createdAt: string
}

export type FindDoctorsError = {
    message: string;
};

export type TFindDoctorsState = {
    status: EStatus.loading | EStatus.idle | EStatus.failed | EStatus.succeeded;
    error: string | null;
    items: TDoctor[];
    item: TDoctor | null;
};

export interface IBookDoctor {
    id?: string;
    doctorId?: number;
    userId?: number;
    name: string;
    phone: string;
    date: string;
    slot: string;
}

export type TBookDoctorsState = {
    items: IBookDoctor[],
    item: IBookDoctor | null,
    error: null,
    status: EStatus;
};