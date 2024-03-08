import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_QUESTIONS } from '../utils/queries';

const InstLanding = () => {
    const [createExamClicked, setCreateExamClicked] = useState(false); // State to track button click
    const { loading, error, data } = useQuery(ALL_QUESTIONS);

    // State for selected questions
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);

    // Effect to update state with fetched questions
    // useEffect(() => {
    //     if (data) {
    //         setQuestions(data.allQuestions);
    //     }
    // }, [data]);

    // Event handler for selecting a question
    const handleQuestionSelect = (questionId) => {
        if (!selectedQuestions.includes(questionId)) {
            setSelectedQuestions([...selectedQuestions, questionId]);
        }
    };

    // Event handler for deselecting a question
    const handleQuestionDeselect = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    };

    // Event handler for creating an exam with selected questions
    const handleCreateExam = () => {
        setCreateExamClicked(true);
    };

    // Event handler for viewing students
    const handleViewStudents = () => {
        navigate('/view-students');
    };

    return (
        <main>
            <div className="flex-row justify-center">
                <button onClick={handleCreateExam}>Create Exam</button>
                <button onClick={handleViewStudents}>See Students</button>
            </div>
            {createExamClicked && (
                <div className="questions-container">
                    <h2>Questions:</h2>
                    {loading ? (
                        <p>Loading questions...</p>
                    ) : error ? (
                        <p>Error loading questions</p>
                    ) : (
                        // Render list of questions here
                        <ul>
                            {questions.map(question => (
                                <li key={question._id} onClick={() => handleQuestionSelect(question._id)}>
                                    {question.question_text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </main>
    );
};

export default InstLanding;
