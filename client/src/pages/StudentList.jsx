import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS, ALL_EXAMS } from '../utils/queries';
import { ASSIGN_EXAM } from '../utils/mutations';
import Navbar from '../components/Navbar'

const StudentList = () => {
    const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);
    const { loading: examsLoading, data: examsData } = useQuery(ALL_EXAMS);
    const [selectedExams, setSelectedExams] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [assignExam] = useMutation(ASSIGN_EXAM);
    const [assignExamMode, setAssignExamMode] = useState(false);
    const [assignmentSuccess, setAssignmentSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const filteredUsers = usersData?.users.filter(user => user.instructor === false) || [];

    const handleAssignExam = async () => {
        console.log('Assigning exams...');
        if (!selectedStudent || selectedExams.length === 0) return;

        try {
            // Assign each selected exam to the student
            await Promise.all(
                selectedExams.map(async examId => {
                    await assignExam({
                        variables: {
                            examId: examId,
                            userId: selectedStudent._id
                        },
                    });
                })
            );
            // Reset selected exams
            setSelectedExams([]);
            // Exit assign exam mode
            setAssignExamMode(false);
            // Set assignment success message
            setSuccessMessage(`${selectedStudent.username}'s exam assigned successfully!`);
            setAssignmentSuccess(true);
            // Remove success message after 5 seconds
            setTimeout(() => {
                setAssignmentSuccess(false);
                setSuccessMessage('');
                setSelectedStudent({});
            }, 5000);
        } catch (error) {
            console.error('Error assigning exams:', error);
        }
    };

    const handleSelectExam = (examId) => {
        setSelectedExams(prevExams => [...prevExams, examId]);
    };

    if (usersLoading || examsLoading) return <div>Loading...</div>;

    return (
        <>
        <Navbar />
        <div className='container'>
            <h2 className='page-title'>Students</h2>
            {assignmentSuccess && <div><strong>{selectedStudent.username}'s exam assigned successfully!</strong></div>}
            {console.log(selectedStudent.username)}
            <div className='page-container'> 
            <div className='segment'>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Exams</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <ul>
                                {user.exams.map((exam, index) => (
                                    <li key={index}>
                                        Completed: {exam.completed ? 'Yes' : 'No'}, Grade: {exam.grade}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <button onClick={() => {
                                setSelectedStudent(user);
                                setAssignExamMode(true);
                                setAssignmentSuccess(false); // Reset success message
                                setSuccessMessage('');
                            }}>Assign Exam</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div className='container' style={{padding: "0"}}>
            {assignExamMode && selectedStudent._id && (
            <div className='segment'>
                <table>
                    <thead>
                        <th>Select Exams for {selectedStudent.username}</th>
                    </thead>
                    <tbody>
                        {examsData.allExams.map(exam => (
                        <tr key={exam._id}>
                            <td >{exam.exam_name}</td>
                            <td><button onClick={() => handleSelectExam(exam._id)}>Select</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <button className='btn-main-function' onClick={handleAssignExam}>Assign Selected Exams</button>
            </div>
        )}
        
        </div>
        </div>
        </div>
        </>
    );
};

export default StudentList;
