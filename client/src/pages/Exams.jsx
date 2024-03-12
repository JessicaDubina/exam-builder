import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_EXAM } from '../utils/mutations';
import { ALL_EXAMS } from "../utils/queries";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Exams = () => {
  const navigate = useNavigate();
  const { loading, data, refetch } = useQuery(ALL_EXAMS);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteExam] = useMutation(DELETE_EXAM);

  const handleDeleteConfirmation = (exam) => {
    setExamToDelete(exam);
    setDeleteConfirmation(true);
  };

  const handleDeleteExam = async () => {
    try {
      await deleteExam({
        variables: {
          examId: examToDelete._id
        }
      });
      setDeleteSuccess(true);
      setDeleteMessage('Exam deleted successfully!');
      refetch();
      setDeleteConfirmation(false);
      setExamToDelete(null);
      setTimeout(() => {
        setDeleteSuccess(false);
        setDeleteMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div>
        {deleteSuccess && <div><strong>{deleteMessage}</strong></div>}
        <h2 className='page-title'>Exams</h2>
        <div className='page-container' style={{justifyContent: 'center'}}>
            <div className='segment'>
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Topic</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.allExams.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.exam_name}</td>
                <td>{exam.topic}</td>
                <td>
                  <button
                    onClick={() => navigate (`/updateexam/${exam._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteConfirmation(exam)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        {deleteConfirmation && (
          <div>
            <p>Are you sure you want to delete "{examToDelete.exam_name}"?</p>
            <button onClick={handleDeleteExam}>Yes</button>
            <button onClick={() => setDeleteConfirmation(false)}>No</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Exams;
