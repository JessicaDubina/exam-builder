const { Schema, model } = require('mongoose');

const examSchema = new Schema({
  _id: {
    type: ID,
    required: true,
    unique: true,
    trim: true,
  },
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
    ref: 'Questions'
  }
]
});


const Exams = model('Exams', examSchema);

module.exports = Exams;
