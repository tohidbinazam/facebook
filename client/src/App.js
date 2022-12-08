import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CodeCheck from './pages/CodeCheck/CodeCheck';
import FindAccount from './pages/FindAccount/FindAccount';
import LinkCheck from './pages/LinkCheck/LinkCheck';
import LogIn from './pages/LogIn/LogIn';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { isLoggedIn, loggedOut } from './redux/auth/action';

function App() {

  const dispatch = useDispatch()
  const token = Cookies.get('token')

  useEffect(() => {
    console.log('Hello');
    if (token) {
      dispatch(isLoggedIn(token))  
    }else{
      dispatch(loggedOut())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <AuthMiddleware> <LogIn/> </AuthMiddleware> }/>
        <Route path='/find-account' element={ <AuthMiddleware> <FindAccount/> </AuthMiddleware> }/>
        <Route path='/code-check' element={ <AuthMiddleware> <CodeCheck/> </AuthMiddleware> }/>
        <Route path='/link-check' element={ <AuthMiddleware> <LinkCheck/> </AuthMiddleware> }/>
        <Route path='/reset-password' element={ <AuthMiddleware> <ResetPassword/> </AuthMiddleware> }/>
      </Routes>
    </div>
  );
}

export default App;
