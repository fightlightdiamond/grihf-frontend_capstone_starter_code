'use client';

import { Button, Card, Label, Select, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { ERoles, ROLES } from '../mock/_DATA_';
import PasswordInput from '../../../common/components/ui-controls/PasswordInput';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../common/hooks';
import { useTypedSelector } from '../../../app/stores';
import { selectError, selectErrors, selectStatus } from '../store/authSlice.ts';
import { signup } from '../store/authAPI.ts';
import type { TRegister } from '../types.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { EStatus } from '../../../common/abstracts/enums';

type Inputs = {
  role: ERoles;
  name: string;
  phone: string;
  email: string;
  password: string;
};

export function Register() {
  const dispatch = useAppDispatch();
  const status = useTypedSelector(selectStatus);
  const error = useTypedSelector(selectError);
  const errorsValid = useTypedSelector(selectErrors);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  useEffect(() => {
    if (status) {
      navigate('/');
    }
  }, [navigate, status]);

  useEffect(() => {
    errorsValid.forEach((err) => {
      setError(err.param as keyof Inputs, {
        type: 'server',
        message: err.msg,
      });
    });
  }, [errorsValid, setError]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const res = data as TRegister;
    dispatch(signup(res));
  };

  function errorMessage(message: string | undefined) {
    return <span className={'text-red-500'}>{message}</span>;
  }

  function disableAction() {
    return status === EStatus.loading;
  }

  return (
    <Card className="w-96">
      <div className={'text-center dark:text-white flex flex-col gap-2 '}>
        <h1 className={'font-bold text-3xl'}>Sign Up</h1>
        <p className={'text-gray-700 dark:text-white'}>Sign up as a Patient</p>
        <p className={'text-gray-700 dark:text-white'}>
          Already a member?{' '}
          <Link className={'text-blue-400'} to={'/login'}>
            Login
          </Link>
        </p>
      </div>
      {errorMessage(error?.toString())}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="max-w-md">
          <div>
            <Label htmlFor="role">Role</Label>
          </div>
          <Select id="role" {...register('role')}>
            {ROLES.map((_) => {
              return (
                <option key={_.id} value={_.id}>
                  {_.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            {...register('name')}
            id="name"
            placeholder="Enter your name"
          />
          {errorMessage(errors.name?.message)}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone">Phone</Label>
          </div>
          <TextInput
            {...register('phone')}
            id="phone"
            placeholder="Enter your phone number"
          />
          {errorMessage(errors.phone?.message)}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput
            {...register('email')}
            id="email1"
            type="email"
            placeholder="test@gmail.com"
          />
          {errorMessage(errors.email?.message)}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <PasswordInput
            register={register('password')}
            error={errors.password?.message}
          />
        </div>
        <Button disabled={disableAction()} type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
}
