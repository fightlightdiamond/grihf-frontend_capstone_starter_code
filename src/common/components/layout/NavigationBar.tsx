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
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function NavigationBar() {
    const auth = useTypedSelector(selectAuth);
    const dispatch = useAppDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
    let navigate = useNavigate();
    const location = useLocation();

    return (
        <MegaMenu>
            <div className="flex w-[100%] items-center justify-around p-4 md:space-x-8">
                <NavbarBrand onClick={() => navigate('/')}>
                    <img alt="" src="/favicon.ico" className="mr-3 h-6 sm:h-9"/>
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">StayHealthy</span>
                </NavbarBrand>
                <div className={'flex justify-around items-center gap-10'}>
                    <NavbarCollapse>
                        <NavbarLink active={location.pathname === '/'} onClick={() => navigate('/')}>
                            Home
                        </NavbarLink>
                        <NavbarLink active={location.pathname === '/find-doctor'}
                                     onClick={() => navigate('/find-doctor')}>Appointments</NavbarLink>
                        <NavbarLink active={location.pathname === '/health-tips-and-guidance'}
                                     onClick={() => navigate('/health-tips-and-guidance')}>Healthy Blog</NavbarLink>
                        <NavbarLink active={location.pathname === '/review'}
                                     onClick={() => navigate('/review')}>Reviews</NavbarLink>
                    </NavbarCollapse>
                    <NavbarToggle/>
                    <div className="flex">
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
                                    <DropdownItem><Link to={'/profile'}>Your Profile</Link></DropdownItem>
                                    <DropdownItem onClick={() => onLogout()}>Your Reports</DropdownItem>
                                    <DropdownItem onClick={() => onLogout()}>Sign out</DropdownItem>
                                </Dropdown> :
                                <div className={'flex gap-1'}>
                                    <Link to={'/register'}>
                                        <Button pill={true} outline={true}>Sign Up</Button>
                                    </Link>
                                    <Link to={'/login'}>
                                        <Button pill={true} outline={true}>Login</Button>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>

            </div>
        </MegaMenu>
    );
}
