import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import SignUp from '../sign-up/SignUp';

const LogIn = () => {

    const [show, setShow] = useState(false);

  return (
    <div>
        { show && <SignUp setShow={ setShow } /> }
        <div className="fb-auth">
            <div className="auth-wrapper">
                <div className="auth-left">
                <img src="./assets/icons/facebook.svg" alt="" />
                <h2>
                    Facebook helps you connect and share with the people in your life.
                </h2>
                </div>
                <div className="auth-right">
                <div className="auth-box">
                    <form action="">
                    <div className="auth-form">
                        <input
                        type="text"
                        placeholder="Email address or phone number"
                        />
                    </div>
                    <div className="auth-form">
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="auth-form">
                        <button type="submit">Log In</button>
                    </div>
                    </form>

                    <Link to="/find-account">Forgotten password?</Link>

                    <div className="divider"></div>

                    <button onClick={ () => setShow(true) }>Create New Account</button>
                </div>
                <p>
                    <a href="https">Create a Page</a> for a celebrity, brand or business.
                </p>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default LogIn