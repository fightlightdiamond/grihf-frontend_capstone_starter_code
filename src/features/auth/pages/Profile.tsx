'use client';

import { Button, Card, Label, Select, TextInput } from 'flowbite-react';
import { ERoles, ROLES } from '../mock/_DATA_';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  role: ERoles;
  name: string;
  phone: string;
  email: string;
  password: string;
};

export function Profile() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={'flex justify-center items-center'}>
      <Card className="w-96">
        <div className={'text-center flex flex-col gap-2'}>
          <h1 className={'font-bold text-3xl'}>Profile</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="max-w-md">
            <div>
              <Label htmlFor="role">Role</Label>
            </div>
            <Select id="role" {...register('role')}>
              {ROLES.map((_) => {
                return <option value={_.id}>{_.name}</option>;
              })}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              {...register('name')}
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone" />
            </div>
            <TextInput
              {...register('phone')}
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
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
          <Button type="submit">Edit</Button>
        </form>
      </Card>
    </div>
  );
}
