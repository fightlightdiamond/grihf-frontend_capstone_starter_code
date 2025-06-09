import {IBookReview, TReview} from "../types";
import {_getBookDoctors, bookDoctors} from "../../find-doctors/mock/_DATA_";

export const reviews: TReview[] = [];

export function _createReview(review: TReview): Promise<TReview> {
    reviews.push(review);

    return Promise.resolve(review);
}

export function _findReview(id: number): Promise<TReview | undefined> {
    const res = reviews.find(review => review.id === id);

    return Promise.resolve(res);
}

export function _getBookReviews(userId: number) {
    const bookReviews: IBookReview[]  = bookDoctors.filter(_ => _.userId === userId)
        .map(book => {
            return {
                ...book,
                review: reviews.find(review => review.bookDoctorId === book.id)
            } as IBookReview;
        })

    console.log('bookReviews', bookReviews)

    return Promise.resolve(bookReviews);
}