import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EXAM, ALL_QUESTIONS } from '../utils/queries';
import { UPDATE_EXAM } from '../utils/mutations';
import Navbar from '../components/Navbar';

const UpdateExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [examName, setExamName] = useState('');
  const [examTopic, setExamTopic] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const { loading: examLoading, data: examData } = useQuery(GET_EXAM, {
    variables: { examId },
  });
  const { loading: questionsLoading, data: questionsData } = useQuery(ALL_QUESTIONS);
  const [updateExam] = useMutation(UPDATE_EXAM);

  useEffect(() => {
    if (!examLoading && examData && examData.getExam) {
      const { getExam } = examData;
      setExamName(getExam.exam_name);
      setExamTopic(getExam.topic);
      setSelectedQuestions(getExam.questions.map(question => question._id));
    }
  }, [examLoading, examData]);
  

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions([...selectedQuestions, questionId]);
  };

  const handleQuestionDeselect = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
  };

  const handleUpdateExam = async () => {
    try {
      await updateExam({
        variables: {
          examId: examId,
          examData: {
            exam_name: examName,
            topic: examTopic,
            questions: selectedQuestions,
          },
        },
      });
      setSuccessMessage('Exam Updated Successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate(`/exams`);
      }, 5000);
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  if (examLoading || questionsLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div id="exam-inputs">
        {successMessage && <div className="success-message">{successMessage}</div>}
        <label>Change Exam Name:</label>
        <input type="text" value={examName} name='examName' onChange={(e) => setExamName(e.target.value)} placeholder="Enter exam name" />
        <label>Change Exam Topic:</label>
        <input type="text" value={examTopic} onChange={(e) => setExamTopic(e.target.value)} placeholder="Enter exam topic" />
        <div className="segment">
          <div className="questions-container">
            <h2>All Questions:</h2>
            <ul className="selection-box">
              {questionsData.allQuestions.map((question) => (
                <li key={question._id} className="selection-list-item">
                  {question.question_text}
                  <button onClick={() => handleQuestionSelect(question._id)}>Select</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="selected-questions">
            <h2>Selected Questions:</h2>
            <ul className="selection-box">
              {selectedQuestions.map((questionId, index) => {
                const selectedQuestion = questionsData.allQuestions.find((question) => question._id === questionId);
                return (
                  <li key={index} className="selection-list-item">
                    {selectedQuestion ? selectedQuestion.question_text : 'Loading...'}
                    <button onClick={() => handleQuestionDeselect(questionId)}>Deselect</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <button className="btn-main-function" onClick={handleUpdateExam}>
          Update Exam
        </button>
      </div>
    </>
  );
};

export default UpdateExam;
