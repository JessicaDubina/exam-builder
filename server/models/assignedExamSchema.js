const { Schema } = require("mongoose");

const assignedExamSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'exam',
    required: true
  },
  grade: {
    type: Number,
    required: true,
    default: 0,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = assignedExamSchema;
