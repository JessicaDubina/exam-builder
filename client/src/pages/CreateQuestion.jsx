import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_QUESTIONS, QUERY_USERS, GET_ME } from '../utils/queries';
import { ADD_EXAM, ADD_QUESTION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'; 

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
    )

}

export default CreateQuestion;