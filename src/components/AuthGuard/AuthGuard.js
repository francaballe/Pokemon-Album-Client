import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard() {  

    const userData = useSelector((state) => state.loggedInUser);
    return userData.id ? <Outlet/> : <Navigate replace to={"/"}/>
    
}

export default AuthGuard;
