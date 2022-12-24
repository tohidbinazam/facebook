import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CodeCheck from './pages/CodeCheck/CodeCheck';
import FindAccount from './pages/FindAccount/FindAccount';
import LinkCheck from './pages/LinkCheck/LinkCheck';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from './redux/auth/action';
import Index from './pages/Index';
import PasswordUser from './pages/PasswordUser/PasswordUser';
import Profile from './pages/profile/Profile';
import LoadingBar from 'react-top-loading-bar'
import { loadEnd } from './redux/loading/action';


function App() {

  const dispatch = useDispatch()
  const token = Cookies.get('fbstk')
  const progress = useSelector(state => state.progress)

  useEffect(() => {
    
    if (token) {
      dispatch(isLoggedIn(token))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App">
      <LoadingBar
        color='#2998ff'
        progress={progress}
        height='3px'
        onLoaderFinished={() => dispatch(loadEnd())}
        />
      <Routes>
        <Route path='/' element={ <Index/> }/>

        <Route path='/profile' element={ <Profile /> }/>

        <Route path='/find-account' element={ <FindAccount/> }/>
        <Route path='/user-account' element={ <PasswordUser/> }/>
        <Route path='/code-check' element={ <CodeCheck/> }/>
        <Route path='/link-check' element={ <LinkCheck/> }/>
        <Route path='/reset-password' element={  <ResetPassword/> }/>

      </Routes>
    </div>
  );
}

export default App;
