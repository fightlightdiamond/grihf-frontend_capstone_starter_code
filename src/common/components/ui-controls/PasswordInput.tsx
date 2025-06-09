import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {TextInput} from "flowbite-react";
import {UseFormRegisterReturn} from "react-hook-form";

interface PasswordInputProps {
    register: UseFormRegisterReturn;
    error?: string;
    placeholder?: string;
}

export default function PasswordInput({ register, error, placeholder = "Enter your password" }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <TextInput
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={`${
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register}
            />

            <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
            >
                {!showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </div>
            {error && <span>This field is required</span>}

        </div>
    );
}