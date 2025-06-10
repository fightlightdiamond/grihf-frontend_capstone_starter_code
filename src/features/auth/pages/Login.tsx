'use client';

import { Button, Card, Label, TextInput } from 'flowbite-react';
import ShowStatus from '../../../common/components/ShowStatus';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { useTypedSelector } from '../../../app/stores';
import { selectAuth, selectError, selectStatus } from '../store/authSlice';
import { login } from '../store/authAPI';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import PasswordInput from '../../../common/components/ui-controls/PasswordInput';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const status = useTypedSelector(selectStatus);
  const error = useTypedSelector(selectError);
  const { state } = useLocation();

  const navigate = useNavigate();
  const auth = useTypedSelector(selectAuth);

  useEffect(() => {
    if (auth) navigate(state?.path || '/');
  }, [auth, navigate, state?.path]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data));
  };

  return (
    <Card className="max-w-md">
      <h1 className="text-center text-2xl text-bold">Login</h1>
      <div className={'flex gap-1'}>
        <p>Are you a new member?</p>
        <Link className={'text-blue-400'} to={'/register'}>
          Sign Up Here
        </Link>
      </div>

      <img src="/poll/spinx.png" alt="" />
      <ShowStatus status={status} error={error} />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            {...register('email')}
            id="email1"
            type="email"
            placeholder="test@gmail.com"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <PasswordInput
            register={register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message}
          />
        </div>
        <Button type="submit">Login</Button>
        <Button color={'red'} type="submit">
          Reset
        </Button>
      </form>
      <div className={'text-center'}>
        <Link to={'/forgot-password'}>Forgot Password?</Link>
      </div>
    </Card>
  );
}
