import React, { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddStudentModal = ({ isOpen, onClose, fetchstud }) => {

    const [fullname, setFullname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !age || !gender || !address) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!'
            });
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/student", {
                fullname,
                gender,
                age,
                address
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Student Successfully Added',
                timer: 1500,
                showConfirmButton: false
            });

            fetchstud();
            onClose();

            setFullname("");
            setAge("");
            setGender("");
            setAddress("");

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response?.data?.message || "Something went wrong"
            });
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <div className='fixed inset-0 z-50 bg-black opacity-90 flex justify-center items-center px-3'>

            <div className='bg-white rounded-lg w-full max-w-md p-5
                            max-[320px]:p-3'>

                <h2 className='text-lg font-semibold mb-4 text-center
                               max-[320px]:text-sm'>
                    Add Student
                </h2>

                <form className='space-y-3'>

                    <div>
                        <label className='block text-sm max-[320px]:text-xs'>Fullname</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Enter Fullname"
                            className='w-full border px-3 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'
                        />
                    </div>

                    <div>
                        <label className='block text-sm max-[320px]:text-xs'>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter Age"
                            className='w-full border px-3 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'
                        />
                    </div>

                    <div>
                        <label className='block text-sm max-[320px]:text-xs'>Gender</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Enter Gender"
                            className='w-full border px-3 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'
                        />
                    </div>

                    <div>
                        <label className='block text-sm max-[320px]:text-xs'>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Address"
                            className='w-full border px-3 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'
                        />
                    </div>

                    <div className='flex justify-end gap-2 mt-4'>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className='bg-amber-500 text-white px-4 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'>
                            Create
                        </button>

                        <button
                            type="button"
                            onClick={handleClose}
                            className='bg-red-500 text-white px-4 py-2 text-sm rounded
                                       max-[320px]:text-xs
                                       max-[320px]:px-2
                                       max-[320px]:py-1'>
                            Close
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddStudentModal