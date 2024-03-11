import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS, QUERY_USERS, GET_ME } from '../utils/queries';
import { ADD_EXAM, ADD_QUESTION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'; 

const InstLanding = () => {
    const [createExamClicked, setCreateExamClicked] = useState(false);
    const [createQuestionClicked, setCreateQuestionClicked] = useState(false);
    const [examName, setExamName] = useState('');
    const [examTopic, setExamTopic] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [ questionText, setQuestionText ] = useState('');
    const [ questionTopic, setQuestionTopic ] = useState('');
    const [questions, setQuestions] = useState([]);
    const [ difficulty, setDifficulty ] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [ correctAnswerIndex, setCorrectAnswerIndex ] = useState();
    const { loading: questionsLoading, data: questionsData } = useQuery(ALL_QUESTIONS);
    const { addQuestion } = useMutation(ADD_QUESTION)
    const [addExam] = useMutation(ADD_EXAM);
    const navigate = useNavigate(); 
    const [answerChoice1, setAnswerChoice1] = useState('');
    const [answerChoice2, setAnswerChoice2] = useState('');
    const [answerChoice3, setAnswerChoice3] = useState('');
    const [answerChoice4, setAnswerChoice4] = useState('');

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
    };

    const handleViewStudents = () => {
        // Redirect user to the StudentList page
        navigate('/students');
    };

    const handleExamNameChange = (e) => {
        setExamName(e.target.value);
    };

    const handleQuestionTextChange = (e) => {
        setQuestionText(e.target.value);
    };

    const handleExamTopicChange = (e) => {
        setExamTopic(e.target.value);
    };

    const handleCreateQuestion = (e) => {
        setCreateQuestionClicked(true);
    }

    const handleAddQuestion = async () => {
        try {
            await addQuestion({
                variables: {
                    question_text: questionText,
                    topic: questionTopic,
                    answer_choices: [answerChoices],
                    difficulty: difficulty,
                    correct_answer: correctAnswerIndex
                }
            })
        }
        catch (error) {
            console.error('Error Adding Question', error)
        }
    };

    const handleQuestionNameChange = (e) => {
        setQuestionText(e.target.value)
    };

    const handleAnswerChoiceChange = (e, setAnswerChoice) => {
        setAnswerChoice(e.target.value);
    };

    const addNewQuestion = (e) => {
        e.preventDefault(); // Prevent form submission
        // Push answer choices to the array
        newAnswerChoices.push(answerChoice1, answerChoice2, answerChoice3, answerChoice4);
    };
    

    // const addNewQuestion = (e) => {
    //     newAnswerChoices.push(formData.)
    // }

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

    const newAnswerChoices = [];

    return (
        <main>
            <div className="flex-row justify-center">
                <button onClick={handleCreateExam}>Create Exam</button>
                <button onClick={handleViewStudents}>See Students</button>
                <button onClick={handleCreateQuestion}>Create New Questions</button>
            </div>

            {createQuestionClicked ? 

            <form id='new-question-form' style={{ marginTop: '50px', marginLeft: '20%', display: 'flex', flexDirection: 'column', width: '60%', justfyContent: 'center', textAlign: 'center'}}>
            <div id='question-text-input'>
            <input 
                type='text'
                value = {questionText}
                onChange={handleQuestionNameChange}
                placeholder="Enter the new question"
                />
            
            </div>
            <div id='question-topic-input'>
                <input 
                type='text'
                value = {questionTopic}
                onChange={handleQuestionNameChange}
                placeholder="Enter the topic of the question"
                />
            </div>
                <label style={{ marginTop: '3%'}}>Difficulty:</label>
                <select id="dropdown" name="dropdown" style={{ width: '10%', alignSelf: 'center', margin: '20px'}}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Difficult">Difficult</option>
                </select>
                <label> Answer Choices: </label>
                <div style={{ display: 'flex', flexDirection: 'column', justfyContent: 'space-between'}}>
                <input 
                    type='text'
                    value={answerChoice1}
                    onChange={(e) => handleAnswerChoiceChange(e, setAnswerChoice1)}
                    placeholder="Enter the first answer choice"
                />
                <input 
                    type='text'
                    value={answerChoice2}
                    onChange={(e) => handleAnswerChoiceChange(e, setAnswerChoice2)}
                    placeholder="Enter the second answer choice"
                />
                <input 
                    type='text'
                    value={answerChoice3}
                    onChange={(e) => handleAnswerChoiceChange(e, setAnswerChoice3)}
                    placeholder="Enter the third answer choice"
                />
                <input 
                    type='text'
                    value={answerChoice4}
                    onChange={(e) => handleAnswerChoiceChange(e, setAnswerChoice4)}
                    placeholder="Enter the fourth answer choice"
                />
                </div>
                <input onClick={addNewQuestion} type="submit" value="Submit"></input>
            </form>
            : null}
               
            {createExamClicked ? (
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
                    <div className="segment ">
                        <div className="questions-container">
                            <h2>All Questions:</h2>
                            <div>
                                <h3>Filter by Topic:</h3>
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
                            <h2>Selected Questions:</h2>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.8em' }}>
                                {selectedQuestions.map(questionId => (
                                    <li key={questionId} className='selection-list-item'>
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