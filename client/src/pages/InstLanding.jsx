import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS, QUERY_USERS } from '../utils/queries';
import { ADD_EXAM } from '../utils/mutations';

const InstLanding = () => {
    const [createExamClicked, setCreateExamClicked] = useState(false);
    const [examName, setExamName] = useState('');
    const [examTopic, setExamTopic] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const { loading: questionsLoading, error: questionsError, data: questionsData, refetch: refetchQuestions } = useQuery(ALL_QUESTIONS);
    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(QUERY_USERS);
    const [addExam] = useMutation(ADD_EXAM);
    const [displayStudents, setDisplayStudents] = useState(false);
    const topicsFromQuestions = questions.reduce((topics, question) => {
        if (!topics.includes(question.topic)) {
            return [...topics, question.topic];
        }
        return topics;
    }, []);

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

    const handleCreateExam = () => {
        setCreateExamClicked(true);
        setDisplayStudents(false); // Hide students when creating exam
    };

    const handleViewStudents = () => {
        setDisplayStudents(true);
        setCreateExamClicked(false); // Hide exam creation when viewing students
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
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((prevTopic) => prevTopic !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleClearFilter = () => {
        setSelectedTopics([]);
    };

    const filteredQuestions = selectedTopics.length > 0 ?
        questions.filter(question => selectedTopics.includes(question.topic)) : questions;

    const filteredUsers = usersData?.users.filter(user => !user.instructor);

    useEffect(() => {
        refetchQuestions({ topics: selectedTopics });
    }, [selectedTopics]);

    return (
        <main>
            <div className="flex-row justify-center">
                <button onClick={handleCreateExam}>Create Exam</button>
                <button onClick={handleViewStudents}>See Students</button>
            </div>
            {displayStudents ? (
                <div>
                    <h2>Students:</h2>
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user.username}>{user.username} - {user.email}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
            {createExamClicked ? (
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
                            <div>
                                <h3>Filter by Topic:</h3>
                                <button onClick={handleClearFilter}>All Topics</button>
                                {topicsFromQuestions.map(topic => (
                                    <button key={topic} onClick={() => handleTopicFilter(topic)}>{topic}</button>
                                ))}
                            </div>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.8em' }}>
                                {filteredQuestions.map(question => (
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
                    <button style={{ marginTop: '40px', backgroundColor: '#4dd7db', color: 'white' }} onClick={handleAddExam}>Add Exam</button>
                </div>
            ) : null}
        </main>
    );
};

export default InstLanding;
