import { useLocation, Navigate } from "react-router";
import {useTypedSelector} from "../../app/stores";
import {selectAuth} from "../../features/auth/store/authSlice";

function Protected({ children }: any) {
    const auth = useTypedSelector(selectAuth);
    const location = useLocation();
    return auth === null ? (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    ) : (
        children
    );
}

export default Protected;