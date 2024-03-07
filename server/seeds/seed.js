const mongoose = require('mongoose');

const db = require('../config/connection');
const { Question, User } = require('../models'); 
const cleanDB = require('./cleanDB');

const questionData = require('./questions.json');
const userData = require('./users.json');


db.once('open', async () => {
    try {
        await cleanDB('Question', 'questions');
        await cleanDB('User', 'users');
       
        for(i=0; i <questionData.length; i++){
            questionData[i]._id= new mongoose.Types.ObjectId();
        }
        await Question.collection.insertMany(questionData);
        console.log(questionData);
        console.log('Seed data has been added!');
        process.exit(0);

    } catch (err) {
        console.error(err); 
    }
    process.exit(1);

});
