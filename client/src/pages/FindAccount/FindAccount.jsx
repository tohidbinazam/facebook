import React from 'react'
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';

const FindAccount = () => {
  return (
    <div>
        <AuthHeader />
        <div className="reset-area">
            <div className="reset-wrapper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Find Your Account</span>
                </div>
                <div className="reset-body">
                    <p>
                    Please enter your email address or mobile number to search for
                    your account.
                    </p>
                    <div className="code-box">
                    <input
                        className="w-100"
                        type="text"
                        placeholder="Email address or mobile number"
                    />
                    </div>
                </div>
                <div className="reset-footer">
                    <div></div>
                    <div className="reset-btn">
                    <Link className="cancel" to="/">Cancel</Link>
                    <a className="continue" href="http">Search</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default FindAccount