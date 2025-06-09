import MegaMenuTop from "./MegaMenuTop";
import {Outlet} from "react-router";

const MasterLayout = () => {
    return <div>
        <MegaMenuTop/>
        <Outlet />
    </div>
}

export default MasterLayout