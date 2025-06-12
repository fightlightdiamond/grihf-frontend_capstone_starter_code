import { faker } from '@faker-js/faker';
import type { TUser } from '../../../common/abstracts/types';
import type { TLogin } from '../types';

export const ERoles = {
  Doctor: 'Doctor',
  Patient: 'Patient',
} as const;

export type ERoles = (typeof ERoles)[keyof typeof ERoles];

export const ROLES = [
  {
    id: ERoles.Doctor,
    name: 'Doctor',
  },
  {
    id: ERoles.Patient,
    name: 'Patient',
  },
];

export const usersFake: TUser[] = Array.from({ length: 8 }).map((_, index) => {
  return {
    id: index,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: '123',
    avatar: faker.image.avatar(),
  };
});

export const users = [
  ...usersFake,
  {
    id: 0,
    name: 'React Member',
    email: 'test@gmail.com',
    password: '123',
    avatar: '/book/b1.png',
  },
];

export function _login(account: TLogin) {
  const { email, password } = account;
  const user = users.find((user) => {
    return email === user.email && password === user.password;
  });
  return Promise.resolve(user);
}

export function _logout() {
  return Promise.resolve(true);
}
