import { Route, Routes } from 'react-router-dom';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CodeCheck from './pages/CodeCheck/CodeCheck';
import FindAccount from './pages/FindAccount/FindAccount';
import LinkCheck from './pages/LinkCheck/LinkCheck';
import LogIn from './pages/LogIn/LogIn';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
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
