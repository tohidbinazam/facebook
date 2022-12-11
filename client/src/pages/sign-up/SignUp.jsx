import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import cross_btn from '../../assets/icons/cross.png'
import { register } from '../../redux/auth/action';
import toaster from '../../utility/toaster';
import { useNavigate } from 'react-router-dom'

const SignUp = ({ setShow }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ input, setInput ] = useState({})

    const birthYears = () => {
        let currentYear = new Date().getFullYear()
        let years = []

        for (let i = 0; i < 80; i++) {
            years.push(currentYear - i)
        }
        
        return years
    }
    

    // All days in a month
    const days = () => {
        let days = []

        for (let i = 1; i <= 31; i++) {
            days.push(i)
        }

        return days
    }

    // All months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const handleInput = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // handle Input Error
    const handleError = (e) => {
        if (!e.target.value) {
            e.target.classList.add('error-border')
        }else{
            e.target.classList.remove('error-border')
        }
    }

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!input.fs_name || !input.sur_name || !input.auth || !input.pass || !input.day || !input.month || !input.year || !input.gender) {
            return toaster('Please fill all the fields')
        }
        dispatch(register(input, setShow, navigate))
    }


  return (
    <div className='SignUp'>
        <div className="blur-box">
        <div className="sign-up-card">
            <div className="sign-up-header">
            <div className="sign-up-content">
                <span>Sign Up</span>
                <span>It's quick and easy.</span>
            </div>
            <button onClick={ () => setShow(false) }><img src={ cross_btn } alt="" /></button>
            </div>
            <div className="sign-up-body">
            <form onSubmit={ handleSubmit }>
                <div className="reg-form reg-form-inline">
                <input onChange={ handleInput } onBlur={ handleError } name='fs_name' type="text" placeholder="First Name" />
                <input onChange={ handleInput } onBlur={ handleError } name='sur_name' type="text" placeholder="Surname" />
                </div>
                <div className="reg-form">
                <input onChange={ handleInput } onBlur={ handleError } name='auth' type="text" placeholder="Mobile number or email address" />
                </div>
                <div className="reg-form">
                <input onChange={ handleInput } onBlur={ handleError } name='pass' type="password" placeholder="New password" />
                </div>
                <div className="reg-form">
                <span>Date of birth</span>
                <div className="reg-form-select">
                    <select name="day" id="" onChange={ handleInput }>
                    {
                        days().map((day, index) => (
                        <option key={ index } value={ day }>{ day }</option>
                        ))
                    }
                    </select>
                    <select name="month" id="" onChange={ handleInput }>
                        {
                            months.map((month, index) => (
                                <option key={ index } value={ month }>{ month }</option>
                            ))
                        }
                    </select>
                    <select name="year" id="" onChange={ handleInput }>
                        {
                            birthYears().map(year => <option key={ year } value={ year }>{ year }</option>)
                        }
                    </select>
                </div>
                </div>

                <div className="reg-form">
                <span>Gender</span>
                <div className="reg-form-select">
                    <label>
                    Male
                    <input type="radio" name="gender" value='Female' onChange={ handleInput }/>
                    </label>
                    <label>
                    Female
                    <input type="radio" name="gender" value='Female' onChange={ handleInput }/>
                    </label>
                    <label>
                    Custom
                    <input type="radio" name="gender" value='Custom' onChange={ handleInput }/>
                    </label>
                </div>
                </div>

                <div className="reg-form">
                <p>
                    People who use our service may have uploaded your contact
                    information to Facebook. <a href="http">Learn more.</a>
                </p>
                </div>
                <div className="reg-form">
                <p>
                    By clicking Sign Up, you agree to our <a href="http">Terms</a>,
                    <a href="http">Privacy Policy</a> and
                    <a href="http">Cookies Policy</a>. You may receive SMS
                    notifications from us and can opt out at any time.
                </p>
                </div>

                <div className="reg-form">
                <button type='submit' >Sign Up</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SignUp