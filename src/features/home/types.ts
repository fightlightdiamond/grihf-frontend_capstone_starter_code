import {EStatus} from "../../common/abstracts/enums";

export type TReview = {
    id: number,
    userId: number,
    review: number,
    rating: number,
    createdAt: string
}

export type TBestService = {
    id: number,
    title: string,
    image: string,
    link: string,
    createdAt: string
}

export type BestServicesError = {
    message: string;
};

export type TBestServicesState = {
    status: EStatus;
    error: string | null;
    bestServices: TBestService[];
    bestService: TBestService | null;
};