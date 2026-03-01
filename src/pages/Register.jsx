import React, { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!'
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                fullname,
                email,
                password
            });

            Swal.fire({
                icon: 'success',
                title: 'Registered!',
                text: response.data.message || "Account successfully created",
                timer: 1500,
                showConfirmButton: false
            });

            // Optionally redirect to login page
            navigate("/");

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || err.message || "Something went wrong"
            });
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen px-3 bg-gray-100'>
            <Form className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg
                             max-[320px]:p-4' formname='Registration Form'>

                <Input
                    label='Fullname'
                    placeholder='Enter your Fullname'
                    onChange={(e) => setFullname(e.target.value)}
                />

                <Input
                    label='Email'
                    type="email"
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label='Password'
                    type="password"
                    placeholder='Enter your Password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    className="w-full mt-5 py-2 text-sm max-[320px]:py-1 max-[320px]:text-xs"
                    onClick={handleRegister}
                >
                    Create Account
                </Button>

                <span className='text-center block mt-4 text-gray-600 text-sm
                                 max-[320px]:text-xs'>
                    Already have an account?
                    <Link to="/" className='text-blue-700 ml-1 hover:underline'>
                        Login 
                    </Link>
                </span>

            </Form>
        </div>
    )
}

export default Register