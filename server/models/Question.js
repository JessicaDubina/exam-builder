const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    question_text: {
        type: String,
        required: true
    },
    answer_choices: [{
        type: String,
        required: true
    }],

    correct_answer: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
});

const Question = model('question', questionSchema);

module.exports = Question;