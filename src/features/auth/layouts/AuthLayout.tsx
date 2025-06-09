import {Outlet} from "react-router";
import NavigationBar from "../../../common/components/layout/NavigationBar";

const AuthLayout = () => {
    return <div className='w-[100%] dark:text-white'>
        <div className={'fixed top-0 w-full'}>
            <NavigationBar />
        </div>

        <div className='mt-32 flex justify-center lg:justify-center lg:w-[100%]'>
            <Outlet />
        </div>
    </div>
}

export default AuthLayout