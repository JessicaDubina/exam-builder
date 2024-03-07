const { Schema, model } = require('mongoose');

const examSchema = new Schema({
  exam_name: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true,
  },

  questions: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
]
});


const Exam = model('Exam', examSchema);

module.exports = Exam;
