import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { IBookReview, TReview } from '../types';
import { _createReview, _getBookReviews } from '../mock/_DATA_';

export const useBookReviewStore = create(
  combine(
    {
      reviews: [] as IBookReview[],
      review: [] as IBookReview[],
      loading: false,
      error: '',
    },
    (set, get) => ({
      getBookReviews: async (userId: number) => {
        set({ loading: true });
        try {
          const res = await _getBookReviews(userId);
          set({ reviews: res, error: '' });
        } catch (err) {
          console.log(err);
          set({ error: 'Lỗi tải getBookReviews', reviews: [] });
        } finally {
          set({ loading: false });
        }
      },
      createReview: async (review: TReview) => {
        set({ loading: true });
        try {
          await _createReview(review);

          const currentReviews = get().reviews; // ❗ Lấy state đúng cách
          const updated = currentReviews.map((_) => {
            if (_.doctorId === review.bookDoctorId) {
              return {
                ..._,
                review,
              };
            }
            return _;
          });
          set({ reviews: updated, error: '' });
        } catch (err) {
          console.log(err);
          set({ error: 'Lỗi tải createReview', reviews: [] });
        } finally {
          set({ loading: false });
        }
      },
    }),
  ),
);
