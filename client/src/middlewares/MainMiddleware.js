import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainMiddleware = ({ children }) => {
    
    // This is Auth Redux
    const { isLoggedIn } = useSelector(state => state.auth)
    
    return isLoggedIn ? children : <Navigate to='/' />
    
}

export default MainMiddleware;