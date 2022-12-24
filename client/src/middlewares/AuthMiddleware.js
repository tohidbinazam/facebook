import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AuthMiddleware = ({ children }) => {

    // Get targeted page
    const file = children[1].type.name
    console.log(file);
    
    // This is authContext
    const { user, reason } = useSelector(state => state.auth)
    
    if ( file === 'PasswordUser') {
        return user ? children : <Navigate to='/' />
    } else if ( file === 'CodeCheck' ) {
        return (reason === 'forgot-password' || reason === 'verify-account') ? children : <Navigate to='/' />
    } else if ( file === 'ResetPassword' ) {
        return reason === 'reset-password' ? children : <Navigate to='/' />
    }else{
        return <Navigate to='/' />
    }
    
}

export default AuthMiddleware;