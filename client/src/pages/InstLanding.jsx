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
 
    const [questions, setQuestions] = useState([]);
  
    const [selectedTopics, setSelectedTopics] = useState([]);

    const { loading: questionsLoading, data: questionsData } = useQuery(ALL_QUESTIONS);
    const [ addQuestion, {error} ] = useMutation(ADD_QUESTION);
    const [addExam] = useMutation(ADD_EXAM);
    const navigate = useNavigate(); 
    const [answerChoice1, setAnswerChoice1] = useState('');
    const [answerChoice2, setAnswerChoice2] = useState('');
    const [answerChoice3, setAnswerChoice3] = useState('');
    const [answerChoice4, setAnswerChoice4] = useState('');
    const [ difficulty, setDifficulty ] = useState('');
    const [ questionTopic, setQuestionTopic ] = useState('');
    const [ questionText, setQuestionText ] = useState('');
    const [ correctAnswerIndex, setCorrectAnswerIndex ] = useState();
    const [ newQuestion, setNewQuestion ] = useState({
        answer_choices: ['', '', '', ''], 
        question_text: '',
        correct_answer: 0,
        difficulty: 'Easy',
        topic: ''
    })

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

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const correctAnswerInt = parseInt(newQuestion.correct_answer); // Define correctAnswerInt
            console.log(newQuestion);
            const { data } = await addQuestion({
                variables: {
                    questionData: {...newQuestion, correct_answer: correctAnswerInt}
                }
            });
            console.log(data);
        }
        catch (error) {
            console.error('Error Adding Question', error)
        }
    };

    const addQuestionData = (e) => {
        e.preventDefault(); // Prevent form submission
        const { name, value } = e.target;
        if(name.includes('choice')) {
            const newArray = [...newQuestion.answer_choices];
            newArray[parseInt(name.charAt(6))] = value;
            console.log(newArray);
            setNewQuestion({...newQuestion, answer_choices: [...newArray]});
        }     
        else {
            setNewQuestion({
                ...newQuestion, 
                [name]: value
            })
        }    
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
                name='question_text'
                value = {newQuestion.question_text}
                onChange={addQuestionData}
                placeholder="Enter the new question"
                />
            
            </div>
            <div id='question-topic-input'>
                <input 
                type='text'
                name='topic'
                value = {newQuestion.topic}
                onChange={addQuestionData}
                placeholder="Enter the topic of the question"
                />
            </div>
                <label style={{ marginTop: '3%'}}>Difficulty:</label>
                <select onChange={addQuestionData} id="dropdown" name="difficulty" style={{ width: '10%', alignSelf: 'center', margin: '20px'}}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Difficult">Difficult</option>
                </select>
                <label> Answer Choices: </label>
                <div style={{ display: 'flex', flexDirection: 'column', justfyContent: 'space-between'}}>
                <input 
                    type='text'
                    name='choice0'
                    value={newQuestion.answer_choices[0]}
                    onChange={addQuestionData}
                    placeholder="Enter the first answer choice"
                />
                <input 
                    type='text'
                    name='choice1'
                    value={newQuestion.answer_choices[1]}
                    onChange={addQuestionData}
                    placeholder="Enter the second answer choice"
                />
                <input 
                    type='text'
                    name='choice2'
                    value={newQuestion.answer_choices[2]}
                    onChange={addQuestionData}
                    placeholder="Enter the third answer choice"
                />
                <input 
                    type='text'
                    name='choice3'
                    value={newQuestion.answer_choices[3]}
                    onChange={addQuestionData}
                    placeholder="Enter the fourth answer choice"
                />
                <label htmlFor='correct_answer'>Select the correct answer from the above choices (1-4)
                <select onChange={addQuestionData} id='correct_answer' name='correct_answer' type='integer'> 
                    <option value='0'>1</option>
                    <option value='1'>2</option>
                    <option value='2'>3</option>
                    <option value='3'>4</option>
                </select>
                </label>
                </div>
                <input onClick={handleAddQuestion} type="submit" value="Submit"></input>
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
                    <button className='btn-main-function' onClick={handleAddExam}>Add Exam</button>
                </div>
            ) : null}
        </main>
    );
};

export default InstLanding;