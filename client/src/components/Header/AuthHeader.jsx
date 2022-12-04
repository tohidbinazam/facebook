import React from 'react'
import facebook_logo from '../../assets/icons/facebook.svg';

const AuthHeader = () => {
  return (
        <div className="reset-header">
            <div className="reset-header-wrapper">
                <div className="reset-logo">
                <img src={ facebook_logo } alt="" />
                </div>
                <div className="login-part">
                <input type="text" placeholder="Email or mobile number" />
                <input type="text" placeholder="Password" />
                <button>Log In</button>
                <a href="https">Forgotten account?</a>
                </div>
            </div>
        </div>
  )
}

export default AuthHeader