import { faker } from '@faker-js/faker';
import type { IBookDoctor, TDoctor } from '../types';
import { DoctorSpecialty } from '../enum';
import { users } from '../../auth/mock/_DATA_';
import type { ICancelPayload } from '../store/bookDoctorsAPI';

export let bookDoctors: IBookDoctor[] = [];

function getRandomDoctorSpecialty(): DoctorSpecialty {
  const values = Object.values(DoctorSpecialty);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as DoctorSpecialty;
}

export const doctors: TDoctor[] = Array.from({ length: 111 }).map(
  (_, index) => {
    const experienceYear = faker.number.int({ min: 1, max: 7 });
    const rating = faker.number.int({ min: 1, max: 5 });

    return {
      id: index,
      userId: faker.number.int({ min: 1, max: 7 }),
      experienceYear: experienceYear,
      rating: rating,
      specialty: getRandomDoctorSpecialty(),
      createdAt: faker.date.anytime().toLocaleString(),
    };
  },
);

export function _findDoctors(specialty: DoctorSpecialty): Promise<TDoctor[]> {
  const findDoctors = doctors
    .filter((_) => _.specialty === specialty)
    .map((_) => {
      return {
        ..._,
        profile: users.find((user) => _.userId === user.id),
      };
    });
  return Promise.resolve(findDoctors);
}

export function _bookDoctor(bookDoctor: IBookDoctor): Promise<IBookDoctor> {
  bookDoctors.push(bookDoctor);

  return Promise.resolve(bookDoctor);
}

export function _cancelBookDoctor(
  payload: ICancelPayload,
): Promise<IBookDoctor[]> {
  const { userId, doctorId } = payload;
  const filterBookDoctors = bookDoctors.filter((bookDoctor) => {
    return bookDoctor.doctorId !== doctorId || bookDoctor.userId !== userId;
  });

  bookDoctors = [...filterBookDoctors];

  return Promise.resolve(bookDoctors);
}

export function _getBookDoctors(userId: number): Promise<IBookDoctor[]> {
  return Promise.resolve(bookDoctors.filter((_) => _.userId === userId));
}
