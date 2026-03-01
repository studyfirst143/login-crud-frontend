import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddStudentModal from './AddStudentModal';
import UpdateStudentModal from './UpdateStudent';
import DeleteStudentModal from './DeleteStudentModal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Crud = () => {

    const [student, setStudent] = useState([]);
    const [searchdata, setSearchdata] = useState("");

    const [openaddmodal, setOpenaddmodal] = useState(false)
    const [openupdatemodal, setOpenupdatemodal] = useState(false);
    const [opendeletemodal, setOpendeletemodal] = useState(false);
    const [selectedstud, Setselectedstud] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const studentPerPage = 5;

    const navigate = useNavigate();

    const fetchstudent = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/student");
            setStudent(response.data.studs);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchstudent();
    }, [])

    const filterstudents = student.filter((stud) =>
        stud.fullname.toLowerCase().includes(searchdata.toLowerCase())
    );

    const indexOfLastStudent = currentPage * studentPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
    const currentStudents = filterstudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filterstudents.length / studentPerPage);

    const handleUpdate = (stud) => {
        setOpenupdatemodal(true);
        Setselectedstud(stud);
    }

    const handleDelete = (stud) => {
        setOpendeletemodal(true);
        Setselectedstud(stud);
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out',
                    text: 'You have been logged out successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate("/");
            }
        });
    }

    return (
        <>
            <main className='px-4'>

                {/* Header Section */}
                <aside className='mt-10 mb-2 flex justify-between items-center gap-2 max-[400px]:flex-col'>

                    <div className='flex gap-2 max-[400px]:flex-col max-[400px]:w-full'>
                        <button
                            className='bg-amber-400 text-white px-4 py-2 text-sm
                            max-[400px]:text-xs max-[400px]:px-2 max-[400px]:py-1 max-[400px]:w-full'
                            onClick={() => setOpenaddmodal(true)}
                        >
                            Create Student
                        </button>

                        <button
                            className='bg-red-500 text-white px-4 py-2 text-sm
                            max-[400px]:text-xs max-[400px]:px-2 max-[400px]:py-1 max-[400px]:w-full'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <input
                        type="search"
                        onChange={(e) => {
                            setSearchdata(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder='Search here...'
                        className='outline-none border border-amber-400 w-60 px-4 py-1 text-sm
                        max-[400px]:w-full max-[400px]:text-xs max-[400px]:px-2'
                    />
                </aside>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className='w-full bg-gray-500 text-sm max-[400px]:text-xs'>

                        <thead className='bg-amber-300 h-10 text-sm max-[400px]:text-xs'>
                            <tr>
                                <th>Fullname</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentStudents.map((stud) => (
                                <tr key={stud._id} className='bg-white h-10 shadow-2xl'>

                                    <td className='text-center'>{stud.fullname}</td>
                                    <td className='text-center'>{stud.age}</td>
                                    <td className='text-center'>{stud.gender}</td>
                                    <td className='text-center'>{stud.address}</td>

                                    <td className='text-center'>
                                        <button
                                            className='bg-blue-600 text-white text-sm px-5.5 py-1 mr-1 mb-1
                                            max-[400px]:text-xs max-[400px]:px-2 max-[400px]:py-1'
                                            onClick={() => handleUpdate(stud)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className='bg-red-600 text-white text-sm px-4 py-1 mb-1
                                            max-[400px]:text-xs max-[400px]:px-2 max-[400px]:py-1'
                                            onClick={() => handleDelete(stud)}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 bg-gray-300 disabled:opacity-50 text-sm max-[400px]:text-xs max-[400px]:px-2"
                    >
                        Prev
                    </button>

                    <span className="px-3 py-1 text-sm max-[400px]:text-xs">
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 bg-gray-300 disabled:opacity-50 text-sm max-[400px]:text-xs max-[400px]:px-2"
                    >
                        Next
                    </button>
                </div>

            </main>

            {/* Modals */}
            <AddStudentModal
                isOpen={openaddmodal}
                onClose={() => setOpenaddmodal(false)}
                fetchstud={fetchstudent}
            />

            {openupdatemodal && selectedstud && (
                <UpdateStudentModal
                    isOpen={openupdatemodal}
                    onClose={() => setOpenupdatemodal(false)}
                    fetchstud={fetchstudent}
                    selectedstudent={selectedstud}
                />
            )}

            {opendeletemodal && selectedstud && (
                <DeleteStudentModal
                    isOpen={opendeletemodal}
                    onClose={() => setOpendeletemodal(false)}
                    fetchstud={fetchstudent}
                    selectedstudent={selectedstud}
                />
            )}
        </>
    )
}

export default Crud