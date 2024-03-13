import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS, QUERY_USERS, GET_ME } from '../utils/queries';
import { ADD_EXAM, ADD_QUESTION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'

const CreateQuestion = () => {
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
    const [addedSuccess, setAddedSuccess] = useState(false);


    const handleViewStudents = () => {
        // Redirect user to the StudentList page
        navigate('/students');
    };

    const handleQuestionTextChange = (e) => {
        setQuestionText(e.target.value);
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
            setAddedSuccess(true);
            setNewQuestion({
                answer_choices: ['', '', '', ''], 
                question_text: '',
                correct_answer: 0,
                difficulty: 'Easy',
                topic: ''
            })
            setTimeout(() => {
                setAddedSuccess(false);
            }, 5000);
            
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

    const newAnswerChoices = [];

    return (
        <>
        <Navbar />
        <h2 className='page-title'>Create a new question</h2>
        {addedSuccess && <div><strong>Question added successfully!</strong></div>}
        <div className='page-container' style={{justifyContent: "center"}}>
        <div className='segment card'>
        <form id='new-question-form'>
        <div className='section'>
        <label className='table-title'> Question Details: </label>
                <input 
                    type='text'
                    name='question_text'
                    value = {newQuestion.question_text}
                    onChange={addQuestionData}
                    placeholder="Enter the new question"
                    />
                <input 
                type='text'
                name='topic'
                value = {newQuestion.topic}
                onChange={addQuestionData}
                placeholder="Enter the topic of the question"
                />
            <div >
                <label style={{ marginRight: "10px"}}>Difficulty:</label>
                <select onChange={addQuestionData} id="dropdown" name="difficulty" >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Difficult">Difficult</option>
                </select>
            </div>
        </div>
        <div className='section'>
            <label className='table-title'> Answer Choices: </label>
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
            <label style={{ marginRight: "10px", marginTop: "1rem"}} htmlFor='correct_answer'>Select the correct answer from the above choices (1-4): 
            <select onChange={addQuestionData} id='correct_answer' name='correct_answer' type='integer'> 
                <option value='0'>1</option>
                <option value='1'>2</option>
                <option value='2'>3</option>
                <option value='3'>4</option>
            </select>
            </label>
            </div>
            </div>
            <input onClick={handleAddQuestion} type="submit" value="Submit" className='btn-main-function submit-btn'></input>
        </form>
        </div>
        </div>
        </>
    )

}

export default CreateQuestion;