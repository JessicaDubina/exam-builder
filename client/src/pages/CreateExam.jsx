import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS, QUERY_USERS, GET_ME } from '../utils/queries';
import { ADD_EXAM, ADD_QUESTION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'

const CreateExam  = () => {
    const [examName, setExamName] = useState('');
    const [examTopic, setExamTopic] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [createExamClicked, setCreateExamClicked] = useState(false);
    const [addExam] = useMutation(ADD_EXAM);
    const { loading: questionsLoading, data: questionsData } = useQuery(ALL_QUESTIONS);

    useEffect(() => {
        if (!questionsLoading && questionsData) {
            setQuestions(questionsData.allQuestions);
        }
    }, [questionsLoading, questionsData]);

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions([...selectedQuestions, questionId]);
    };

    const handleQuestionDeselect = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    };

    const handleExamNameChange = (e) => {
        setExamName(e.target.value);
    };

    const handleExamTopicChange = (e) => {
        setExamTopic(e.target.value);
    };

    const handleAddExam = async () => {
        try {
            await addExam({
                variables: {
                    examData: {
                        exam_name: examName,
                        topic: examTopic,
                        questions: selectedQuestions
                    }
                }
            });
            setCreateExamClicked(false); // Reset exam creation after successful addition
            setExamName('');
            setExamTopic('');
            setSelectedQuestions([]);
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };

    const handleTopicFilter = (topic) => {
        setSelectedTopics([topic]);
    };

    const uniqueTopics = questionsData ? [...new Set(questionsData.allQuestions.map(question => question.topic))] : [];

    const filteredQuestions = selectedTopics.length > 0 ?
        questions.filter(question => selectedTopics.includes(question.topic)) : questions;

return (
<>
<Navbar />
<div className='container'>
<h2 className='page-title'>Create Exam</h2>
<div id="exam-inputs">
                    <input
                        type="text"
                        value={examName}
                        onChange={handleExamNameChange}
                        placeholder="Enter exam name"
                    />
                    <input
                        type="text"
                        value={examTopic}
                        onChange={handleExamTopicChange}
                        placeholder="Enter exam topic"
                    />
                    <div className="segment" id="create-exam-container">
                        <div className="questions-container">
                            <h2 className='table-title'>All Questions:</h2>
                            <div>
                                <h4 style={{marginTop: "1rem"}}>Filter by Topic:</h4>
                                <button onClick={() => setSelectedTopics([])}>All Topics</button>
                                {uniqueTopics.map(topic => (
                                    <button key={topic} onClick={() => handleTopicFilter(topic)}>{topic}</button>
                                ))}
                            </div>
                            <ul className="selection-box">
                                {filteredQuestions.map(question => (
                                    <li key={question._id} className="selection-list-item">
                                        {question.question_text}
                                        <button onClick={() => handleQuestionSelect(question._id)}>Select</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="selected-questions">
                            <h2 className='table-title'>Selected Questions:</h2>
                            <ul className='selection-box'>
                                {selectedQuestions.map(questionId => (
                                    <li key={questionId} className='selection-list-item'>
                                        {questions.find(question => question._id === questionId)?.question_text}
                                        <button onClick={() => handleQuestionDeselect(questionId)}>Deselect</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <button className='btn-main-function' onClick={handleAddExam}>Add Exam</button>
                </div>
                </div>
                </>
)
    }

    export default CreateExam;