const db = require('../config/connection');
const { Questions, Users } = require('../models'); // Import models here
const cleanDB = require('./cleanDB');

const questionsData = require('./questions.json');
const usersData = require('./users.json');
//add other data here

db.once('open', async () => {
    try {
        await cleanDB('Question', 'questions');
        await cleanDB('User', 'users');
        // await cleanDB('', ''); //add other data here
    
        await Questions.create(questionsData);
        await Users.create(usersData);
        // await .create(); //add other data here
    
        console.log('Seed data has been added!');
        process.exit(0);
    } catch (err) {
        console.error(err); 
    }
    process.exit(1);

});
