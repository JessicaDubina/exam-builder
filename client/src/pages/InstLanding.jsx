import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_QUESTIONS } from '../utils/queries';

const InstLanding = () => {
    const [createExamClicked, setCreateExamClicked] = useState(false); // State to track button click
    const { loading, error, data } = useQuery(ALL_QUESTIONS);

    // State for selected questions
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]); // State for selected topics

    // Update questions state when data is fetched
    useEffect(() => {
        if (!loading && data) {
            setQuestions(data.allQuestions);
        }
    }, [loading, data]);

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

    // Event handler for selecting topics
    const handleTopicSelect = (e) => {
        setSelectedTopics(Array.from(e.target.selectedOptions, option => option.value));
    };

    const filteredQuestions = selectedTopics.length > 0 ? 
    questions.filter(question => selectedTopics.includes(question.topic)) : questions;


    return (
        <main>
            <div className="flex-row justify-center">
                <button onClick={handleCreateExam}>Create Exam</button>
                <button onClick={handleViewStudents}>See Students</button>
            </div>
            {createExamClicked && (
                <div className="questions-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <h2>Questions:</h2>
                    {/* Dropdown for selecting topics */}
                    <select multiple onChange={handleTopicSelect}>
                        <option value="">All Topics</option>
                        {/* Fetch all unique topics and map them to options */}
                        {data && Array.from(new Set(data.allQuestions.map(question => question.topic))).map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                    {loading ? (
                        <p>Loading questions...</p>
                    ) : error ? (
                        <p>Error loading questions</p>
                    ) : (
                        // Render list of filtered questions here
                        <ul>
                            {filteredQuestions.map(question => (
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
