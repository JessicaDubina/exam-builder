import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS} from '../utils/queries';
import { ADD_EXAM } from '../utils/mutations';

const InstLanding = () => {
    const [createExamClicked, setCreateExamClicked] = useState(false);
    const [examName, setExamName] = useState('');
    const [examTopic, setExamTopic] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const { loading, error, data } = useQuery(ALL_QUESTIONS);
    const [addExam] = useMutation(ADD_EXAM);

    useEffect(() => {
        if (!loading && data) {
            setQuestions(data.allQuestions);
        }
    }, [loading, data]);

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions([...selectedQuestions, questionId]);
    };

    const handleQuestionDeselect = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    };

    const handleCreateExam = () => {
        setCreateExamClicked(true);
    };

    const handleViewStudents = () => {
        navigate('/view-students');
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
        } catch (error) {
            console.error('Error adding exam:', error);
        }
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
                <div>
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
                    <div className="flex-row" style={{ display: 'flex', width: '100%' }}>
                        <div className="questions-container" style={{ flex: 1, height: '50vh', overflowY: 'auto' }}>
                            <h2>All Questions:</h2>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.8em' }}>
                                {questions.map(question => (
                                    <li key={question._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                        {question.question_text}
                                        <button onClick={() => handleQuestionSelect(question._id)}>Select</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="selected-questions" style={{ flex: 1, height: '50vh', overflowY: 'auto' }}>
                            <h2>Selected Questions:</h2>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.8em' }}>
                                {selectedQuestions.map(questionId => (
                                    <li key={questionId} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                        {questions.find(question => question._id === questionId)?.question_text}
                                        <button onClick={() => handleQuestionDeselect(questionId)}>Deselect</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <button onClick={handleAddExam}>Add Exam</button>
                </div>
            )}
        </main>
    );
};

export default InstLanding;
