import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Form from '../components/Form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUseremail, setUserfullname, setToken } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!'
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });

            if (response.data) {
                setUseremail(email);
                setUserfullname(response.data.User.fullname);
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome ${response.data.User.fullname}`,
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate("/crud");
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || err.message || "Something went wrong"
            });
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen px-3 bg-gray-100'>
            <Form className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg
                             max-[320px]:p-4' formname='Login Form'>

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant='warning'
                    className='w-full mt-5 py-2 text-sm max-[320px]:py-1 max-[320px]:text-xs'
                    onClick={handleLogin}
                >
                    Login
                </Button>

                <span className='text-center block mt-4 text-gray-600 text-sm
                                 max-[320px]:text-xs'>
                    Don't Have an Account?
                    <Link to="/register" className='text-blue-700 text-sm ml-1 hover:underline'>
                        Register 
                    </Link>
                </span>
            </Form>
        </div>
    )
}

export default Login