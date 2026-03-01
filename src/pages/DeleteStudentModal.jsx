import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const DeleteStudentModal = ({ isOpen, onClose, fetchstud, selectedstudent }) => {

    const [id, setId] = useState(null);

    useEffect(() => {
        if (selectedstudent) setId(selectedstudent._id);
    }, [selectedstudent])

    if (!isOpen) return null;

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!id) return;

        try {
            await axios.delete(`http://localhost:5000/api/student/${id}`);

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${selectedstudent.fullname} has been successfully deleted.`,
                timer: 1500,
                showConfirmButton: false
            });

            fetchstud();
            onClose();

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response?.data?.message || err.message || "Something went wrong"
            });
        }
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-3'>

            <div className='bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center
                            max-[320px]:p-4 max-[320px]:text-xs transition-transform transform scale-100'>
                
                <h2 className='text-2xl font-bold mb-4 text-center
                               max-[320px]:text-lg'>
                    Delete Student
                </h2>

                <p className='text-center text-gray-700 mb-6'>
                    Are you sure you want to delete <span className='font-semibold text-red-600'>{selectedstudent?.fullname}</span>?
                </p>

                <div className='flex gap-4 w-full justify-center'>

                    <button
                        onClick={handleClose}
                        className='flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg
                                   max-[320px]:py-1 max-[320px]:text-xs transition-colors duration-200'>
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg
                                   max-[320px]:py-1 max-[320px]:text-xs transition-colors duration-200'>
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}

export default DeleteStudentModal