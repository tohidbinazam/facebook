import React from 'react'
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/Footer/AuthFooter';
import AuthHeader from '../../components/Header/AuthHeader';

const ResetPassword = () => {
  return (
    <div>
        <AuthHeader />
        <div className="reset-area">
            <div className="reset-wrapper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Choose a new password</span>
                </div>
                <div className="reset-body">
                    <p>
                    Create a new password that is at least 6 characters long. A strong
                    password has a combination of letters, digits and punctuation
                    marks.
                    </p>
                    <div className="code-box">
                    <input className="w-100" type="text" placeholder="New password" />
                    </div>
                </div>
                <div className="reset-footer">
                    <div></div>
                    <div className="reset-btn">
                    <Link className="cancel" to="/">Skip</Link>
                    <a className="continue" href="http">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <AuthFooter />
    </div>
  )
}

export default ResetPassword