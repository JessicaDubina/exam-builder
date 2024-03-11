import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS, ALL_EXAMS } from '../utils/queries';
import { ASSIGN_EXAM } from '../utils/mutations';

const StudentList = () => {
    const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);
    const { loading: examsLoading, data: examsData } = useQuery(ALL_EXAMS);
    const [selectedExams, setSelectedExams] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [assignExam] = useMutation(ASSIGN_EXAM);
    const [assignExamMode, setAssignExamMode] = useState(false);
    const [assignmentSuccess, setAssignmentSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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
            // Reset selected student
            setSelectedStudent({});
            // Exit assign exam mode
            setAssignExamMode(false);
            // Set assignment success message
            setSuccessMessage(`${selectedStudent.username}'s exam assigned successfully!`);
            setAssignmentSuccess(true);
            // Remove success message after 5 seconds
            setTimeout(() => {
                setAssignmentSuccess(false);
                setSuccessMessage('');
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
        <div>
            <h2>Students</h2>
            {assignmentSuccess && <div style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</div>}
            {usersData.users.map(user => (
                <div key={user._id}>
                    {assignExamMode && selectedStudent._id === user._id && (
                        <div>
                            <h3>Select Exams for {selectedStudent.username}</h3>
                            <ul>
                                {examsData.allExams.map(exam => (
                                    <li key={exam._id}>
                                        {exam.exam_name}
                                        <button onClick={() => handleSelectExam(exam._id)}>Select</button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleAssignExam}>Assign Selected Exams</button>
                        </div>
                    )}
                    {!assignExamMode && (
                        <div>
                            <h3>{user.username}</h3>
                            <p>Email: {user.email}</p>
                            <p>Exams:</p>
                            <ul>
                                {user.exams.map((exam, index) => (
                                    <li key={index}>
                                        Completed: {exam.completed ? 'Yes' : 'No'}, Grade: {exam.grade}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => {
                                setSelectedStudent(user);
                                setAssignExamMode(true);
                                setAssignmentSuccess(false); // Reset success message
                                setSuccessMessage('');
                            }}>Assign Exam</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StudentList;
