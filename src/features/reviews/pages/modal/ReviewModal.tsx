import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Rating,
  RatingStar,
  Textarea,
  TextInput,
} from 'flowbite-react';

import { type SubmitHandler, useForm } from 'react-hook-form';
import type { TReview } from '../../types.ts';
import { useBookReviewStore } from '../../store/reviewStore.ts';
import React from 'react';

interface IReviewModelProps {
  userId: number;
  bookDoctorId: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<boolean>;
}

type Inputs = {
  name: string;
  review: string;
  rating: number;
};

const ReviewModal = ({
  userId,
  bookDoctorId,
  openModal,
  setOpenModal,
}: IReviewModelProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>();

  const rating = watch('rating');

  const createReview = useBookReviewStore.getState().createReview;

  function handleRatingClick(value: number) {
    setValue('rating', value, { shouldValidate: true }); // set và validate luôn
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const res: TReview = {
      ...data,
      userId,
      bookDoctorId,
    };
    console.log('res', res);
    createReview(res).then(() => {
      setOpenModal(false);
    });
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>Review</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Name:</Label>
            </div>
            <TextInput
              {...register('name')}
              id="name"
              type="text"
              sizing="md"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="review">Review:</Label>
            </div>
            <Textarea
              {...register('review')}
              id="review"
              placeholder="Leave a comment..."
              required
              rows={4}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="rating">Review:</Label>
            </div>
            <Rating id={'rating'}>
              {Array.from({ length: 5 }).map((_, indexRating) => (
                <RatingStar
                  key={indexRating}
                  onClick={() => handleRatingClick(indexRating)}
                  className={'hover:text-yellow-400'}
                  filled={rating > indexRating - 1}
                />
              ))}
            </Rating>
          </div>

          <Button className={'w-full'} type="submit">
            Submit
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ReviewModal;
