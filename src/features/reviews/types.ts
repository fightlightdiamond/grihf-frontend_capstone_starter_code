import {IBookDoctor} from "../find-doctors/types";

export type TReview = {
    id: number,
    bookDoctorId: number,
    userId: number,
    name: string,
    review: number,
    rating: number,
    createdAt: string,
}

export interface IBookReview extends IBookDoctor{
    review: TReview
}

