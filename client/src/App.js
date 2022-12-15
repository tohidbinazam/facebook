import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CodeCheck from './pages/CodeCheck/CodeCheck';
import FindAccount from './pages/FindAccount/FindAccount';
import LinkCheck from './pages/LinkCheck/LinkCheck';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from './redux/auth/action';
import Index from './pages/Index';
import PasswordUser from './pages/PasswordUser/PasswordUser';

function App() {

  const dispatch = useDispatch()
  const token = Cookies.get('fbstk')

  useEffect(() => {
    
    if (token) {
      dispatch(isLoggedIn(token))
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Index/> }/>
        <Route path='/find-account' element={ <AuthMiddleware> <FindAccount/> </AuthMiddleware> }/>
        <Route path='/user-account' element={ <AuthMiddleware> <PasswordUser/> </AuthMiddleware> }/>
        <Route path='/code-check' element={ <AuthMiddleware> <CodeCheck/> </AuthMiddleware> }/>
        <Route path='/link-check' element={ <AuthMiddleware> <LinkCheck/> </AuthMiddleware> }/>
        <Route path='/reset-password' element={ <AuthMiddleware> <ResetPassword/> </AuthMiddleware> }/>
      </Routes>
    </div>
  );
}

export default App;
