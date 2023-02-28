import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../redux/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    const [formData, setformData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message, isLoading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch])

    const handleChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    };

    if(isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="'email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="'password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
