import type { IBookDoctor, TDoctor } from '../find-doctors/types';
import type { TUser } from '../../common/abstracts/types';

export type TReview = {
  id?: number;
  bookDoctorId: number;
  userId: number;
  name: string;
  review: string;
  rating: number;
  createdAt?: string;
};

export interface IBookReview extends IBookDoctor {
  review: TReview;
  doctor: TDoctor;
  userDoctor: TUser;
}
