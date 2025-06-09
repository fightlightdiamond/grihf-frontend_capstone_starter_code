import {Outlet} from "react-router";
import NavigationBar from "./NavigationBar";

const BaseLayout = () => {

    return <div>
        <NavigationBar/>
        <div className={'mt-4'}>
            <Outlet />
        </div>

    </div>
}

export default BaseLayout