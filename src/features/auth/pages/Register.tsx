"use client";

import {Button, Card, Checkbox, Label, Select, TextInput} from "flowbite-react";
import {Link} from "react-router-dom";
import {ERoles, ROLES} from "../mock/_DATA_";
import PasswordInput from "../../../common/components/ui-controls/PasswordInput";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    role: ERoles
    name: string
    phone: string
    email: string
    password: string
}

export function Register() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <Card className="w-96">
            <div className={'text-center dark:text-white flex flex-col gap-2 '}>
                <h1 className={'font-bold text-3xl'}>Sign Up</h1>
                <p className={'text-gray-700 dark:text-white'}>Sign up as a Patient</p>
                <p className={'text-gray-700 dark:text-white'}>Already a member? <Link className={'text-blue-400'} to={'/login'}>Login</Link></p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="max-w-md">
                    <div>
                        <Label htmlFor="role">Role</Label>
                    </div>
                    <Select id="role" {...register("role")}>
                        {
                            ROLES.map((_) => {
                                return <option value={_.id}>{_.name}</option>
                            })
                        }
                    </Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name"/>
                    </div>
                    <TextInput {...register("name")} id="name" placeholder="Enter your name"/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone"/>
                    </div>
                    <TextInput
                        {...register("phone")}
                        id="phone" placeholder="Enter your phone number"/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email"/>
                    </div>
                    <TextInput
                        {...register("email")}
                        id="email1" type="email" placeholder="test@gmail.com"/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password"/>
                    </div>
                    <PasswordInput
                        register={register("password", { required: "Password is required" })}
                        error={errors.password?.message}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Card>
    );
}
