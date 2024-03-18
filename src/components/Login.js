import React, { useEffect, useState } from 'react';
import './scss/Login.scss';
import { toast } from 'react-toastify';
import { loginApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UseContext';

function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { loginContext } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required...");
            return;
        }
        setIsLoading(true);
        const res = await loginApi(email, password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate("/");
        }
        else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setIsLoading(false);
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handleClickEnter = (e) => {
        if (e && e.keyCode === 13) {
            handleLogin();
        }
    }

    return (
        <div className="login-container col-11 col-md-6 col-xl-4">
            <div className="title">Log in</div>
            <div className="text">
                <p>Email or username</p>
                <p>(Email: eve.holt@reqres.in | Password: -Random- )</p>
            </div>
            <div className="form-input">
                <input
                    type="email"
                    placeholder='Email or username'
                    className='inputField'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => handleClickEnter(e)}
                />
            </div>
            <div className="form-input">
                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder='Password'
                    className='inputField'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => handleClickEnter(e)}
                />
                <i className={isShowPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button
                className={email && password.length >= 6 ? "btn-login active" : "btn-login"}
                disabled={email && password.length >= 6 ? false : true}
                onClick={handleLogin}
            >
                {isLoading && <i className="fas fa-sync fa-spin"></i>}
                <span>Log in</span>
            </button>
            <div className='btn-goback' onClick={handleGoBack}>
                <i className="fa-solid fa-angle-left"></i>
                <span className="ms-2">Go back</span>
            </div>
        </div>
    );
}

export default Login;