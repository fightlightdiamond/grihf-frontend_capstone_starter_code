import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../../app/stores';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { selectAuth } from '../../auth/store/authSlice';
import { useBookReviewStore } from '../store/reviewStore';
import type { IBookReview } from '../types';
import ReviewModal from './modal/ReviewModal.tsx';

const Review: React.FC = () => {
  const authState = useTypedSelector(selectAuth);
  const [openModal, setOpenModal] = useState(false);
  const [book, setBook] = useState<IBookReview>();

  const reviews = useBookReviewStore((state) => state.reviews);
  const loading = useBookReviewStore((state) => state.loading);
  const error = useBookReviewStore((state) => state.error);
  const getBookReviews = useBookReviewStore.getState().getBookReviews;

  useEffect(() => {
    console.log('authState?.id', authState?.id);
    if (typeof authState?.id === 'number') {
      getBookReviews(authState?.id);
    }
  }, [authState?.id]);

  const onSelectReview = (index: number) => {
    setBook(reviews[index]);
    setOpenModal(true);
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={'container mx-auto'}>
      <h1 className={'font-bold text-2xl leading-10'}>Reviews</h1>
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>Doctor Name</TableHeadCell>
            <TableHeadCell>Doctor Speciality</TableHeadCell>
            <TableHeadCell>Provide Review</TableHeadCell>
            <TableHeadCell>Review Given</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {reviews?.map((review, indexBook) => (
              <TableRow
                key={indexBook}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  1
                </TableCell>
                <TableCell>Sliver</TableCell>
                <TableCell>Laptop</TableCell>
                <TableCell>
                  {review.review ? (
                    <Button disabled={true}>Give Review</Button>
                  ) : (
                    <Button onClick={() => onSelectReview(indexBook)}>
                      Give Review
                    </Button>
                  )}
                </TableCell>
                <TableCell>{review?.review?.review}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReviewModal
        bookDoctorId={book?.doctorId as number}
        userId={authState?.id as number}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
};

export default Review;
