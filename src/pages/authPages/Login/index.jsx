import { useState } from 'react'
import IgiLogo from "../../../assets/images/igi-logo.png";
import InputField from '../../../components/InputField';
import email from "../../../assets/images/email-icon.png";
import loginBtn from "../../../assets/images/login-btn-icon.png";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRights, setToken, setUser } from '../../../redux/authSlice';
import useErrorHandlingHook from '../../../hooks/useErrorHandlingHook';
import { validationRules } from '../../../utils/Validations';
import { usePostMutation } from '../../../api/apiSlice';
import { endpoints } from '../../../api/config';
import { toast } from 'react-toastify';


function Login() {
    const validationSchema = {
        email: [validationRules.required('Email'), validationRules.email()],
        password: [validationRules.required('Password'),
            // validationRules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be 8 characters including Uppercase, Lowercase & special character.")
        ]
    };
    const { apiData, setterForApiData, checkForError } = useErrorHandlingHook(
        { email: '', password: "" },
        validationSchema,
    );
    const dispatch = useDispatch();

    const [postApi, { data, isLoading, error, isSuccess }] = usePostMutation();

    const submitLogin = async (e) => {
        e.preventDefault();

        const isAllowed = checkForError();
        if (!isAllowed) return;

        postApi({
            endpoint: endpoints.auth.login,
            data: {
                userName: apiData.email,
                password: apiData.password,
            },
        }).unwrap().then((data) => {

            if (data?.data?.roleRights?.length > 0) {
                dispatch(setRights(data?.data?.roleRights))
            }
            else {

                throw new Error("You dont have any rights")
            }
            dispatch(setUser(data.data.userName));
            dispatch(setToken(data.data.token));
            toast.success(data?.message)
        }).catch((err) => {
            toast.error(err?.message ?? err?.data?.message);
        })
    };

    return (
        <div className='login-container'>
            <div className="login-info-container">
                <img src={IgiLogo} className="login-logo" />
                <h1 className="login-to">Login to <span>manage your claims.</span></h1>
                <p className="login-info">Enter your email or mobile number to access your claim portal to manage,
                    track, & update your
                    claims easily.</p>
            </div>
            <form onSubmit={submitLogin} className='loginForm'>
                <div className="login-input-contaner">
                    <InputField
                        heading={"Email Address / Mobile Number"}
                        placeholder={"imran-naveed-8852@gmail.com"}
                        showIcon={true}
                        rightIcon={email}
                        onChange={(e) => setterForApiData("email", e.target.value)}
                        value={apiData.email}
                        error={apiData.error_email}
                    />
                    <InputField
                        heading={"Your Password"}
                        placeholder={"*************"}
                        showIcon={true}
                        passwordIcon={true}
                        value={apiData.password}
                        onChange={(e) => setterForApiData("password", e.target.value)}
                        error={apiData.error_password}

                    />
                    <div className="remember-container">
                        <div className="remember-checkBox-container">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember Password</label>
                        </div>
                        <div className="forgot-password">
                            <button><Link to={"/ForgotPassword"}>Forgot Password?</Link></button>
                        </div>
                    </div>
                </div>
                <div className="login-btn-container">
                    <button type='submit' disabled={isLoading ? true : false} style={{ background: isLoading ? "grey" : "linear-gradient(#0B4A98, #48C3FF)", }}>
                        <img src={loginBtn} alt="Login Icon" />
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </div>
                <div className="dont-have">
                    <p>Don’t have an account? <button><Link to={"/Signup"}>Signup</Link></button></p>
                </div>
            </form>
        </div>
    )
}

export default Login