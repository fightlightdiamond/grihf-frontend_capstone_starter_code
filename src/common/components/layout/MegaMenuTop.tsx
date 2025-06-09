'use client';

import {
    Avatar,
    Button,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    MegaMenu,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import {useTypedSelector} from "../../../app/stores";
import {logout, selectAuth} from "../../../features/auth/store/authSlice";
import {useAppDispatch} from "../../hooks";
import {useLocation, useNavigate} from "react-router-dom";
import React from "react";

export default function MegaMenuTop() {
    const auth = useTypedSelector(selectAuth);
    const dispatch = useAppDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
    let navigate = useNavigate();
    const location = useLocation();

    return (
        <MegaMenu>
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
                <NavbarBrand onClick={() => navigate('/')}>
                    <img alt="" src="/favicon.ico" className="mr-3 h-6 sm:h-9"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Poll App</span>
                </NavbarBrand>

                <div className="flex md:order-2">
                    {
                        auth ? <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings"
                                        img={auth?.avatar} rounded/>
                            }
                        >
                            <DropdownHeader>
                                <span className="block text-sm">{auth?.name}</span>
                                <span className="block truncate text-sm font-medium">{auth?.email}</span>
                            </DropdownHeader>
                            <DropdownItem onClick={() => onLogout()}>Sign out</DropdownItem>
                        </Dropdown> :
                            <div className={'flex gap-1'}>
                                <Button pill={true} outline={true}>Sign Up</Button>
                                <Button pill={true} outline={true}>Login</Button>
                            </div>
                    }

                </div>
                <NavbarCollapse>
                    <NavbarLink active={location.pathname ==='/'} onClick={() => navigate('/')}>
                        Home
                    </NavbarLink>
                    <NavbarLink active={location.pathname ==='/leaderboards'} onClick={() => navigate('/leaderboards')}>Leader board</NavbarLink>
                    <NavbarLink active={location.pathname ==='/new-polls'} onClick={() => navigate('/new-polls')}>New</NavbarLink>
                </NavbarCollapse>
                <NavbarToggle/>
            </div>
        </MegaMenu>
    );
}
