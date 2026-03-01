import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const UpdateStudentModal = ({ isOpen, onClose, fetchstud, selectedstudent }) => {

    const [fullname, setFullname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [id, setID] = useState("");

    useEffect(() => {
        if (selectedstudent) {
            setFullname(selectedstudent.fullname);
            setAge(selectedstudent.age);
            setGender(selectedstudent.gender);
            setAddress(selectedstudent.address);
            setID(selectedstudent._id);
        }
    }, [selectedstudent])

    if (!isOpen) return null;

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !age || !gender || !address) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!'
            });
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/student/${id}`, { fullname, gender, age, address });

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${fullname} has been successfully updated.`,
                timer: 1500,
                showConfirmButton: false
            });

            fetchstud();
            onClose();

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: err.response?.data?.message || err.message || "Something went wrong"
            });
        }
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center px-3'>

            <div className='bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col items-center
                            max-[320px]:p-4 max-[320px]:text-xs'>

                <h2 className='text-2xl font-bold mb-4 text-center
                               max-[320px]:text-lg'>
                    Update Student
                </h2>

                <Input
                    label='Fullname'
                    placeholder='Enter Your Fullname'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <Input
                    label='Age'
                    placeholder='Enter Your Age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <Input
                    label='Gender'
                    placeholder='Enter Your Gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <Input
                    label='Address'
                    placeholder='Enter Your Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className='flex gap-4 mt-6 w-full'>
                    <button
                        onClick={handleSubmit}
                        className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg
                                   max-[320px]:py-1 max-[320px]:text-xs transition-colors duration-200'>
                        Update
                    </button>

                    <button
                        onClick={handleClose}
                        className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg
                                   max-[320px]:py-1 max-[320px]:text-xs transition-colors duration-200'>
                        Close
                    </button>
                </div>

            </div>

        </div>
    )
}

export default UpdateStudentModal