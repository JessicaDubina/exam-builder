const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    answer_text: {
        type: String,
        required: true
    }
});

const questionSchema = new Schema({
    question_text: {
        type: String,
        required: true
    },
    answer_choices: [answerSchema],

    correct_answer_index: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
});

const Question = model('Question', questionSchema);

module.exports = Question;
