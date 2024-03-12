import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_EXAM, UPDATE_EXAM } from '../utils/mutations';
import { ALL_EXAMS } from "../utils/queries";

const Exams = () => {
  // Fetch all exams using the ALL_EXAMS query
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
      // If deletion is successful, show success message
      setDeleteSuccess(true);
      setDeleteMessage('Exam deleted successfully!');
      // Refetch exams to update the list
      refetch();
      // Close the confirmation dialog
      setDeleteConfirmation(false);
      setExamToDelete(null);
      // Hide success message after 5 seconds
      setTimeout(() => {
        setDeleteSuccess(false);
        setDeleteMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  // Render loading message while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Render the table of exams
  return (
    <div>
      {deleteSuccess && <div><strong>{deleteMessage}</strong></div>}
      <h2>Exams</h2>
      <table>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Topic</th>
            {/* Add more table headers as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.allExams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.exam_name}</td>
              <td>{exam.topic}</td>
              {/* Add more table cells for other exam properties */}
              <td>
                <button className="update-button">Update</button>
                <button className="delete-button" onClick={() => handleDeleteConfirmation(exam)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteConfirmation && (
        <div>
          <p>Are you sure you want to delete "{examToDelete.exam_name}"?</p>
          <button onClick={handleDeleteExam}>Yes</button>
          <button onClick={() => setDeleteConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Exams;
