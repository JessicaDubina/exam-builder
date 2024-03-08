const { Schema, model } = require("mongoose");

const examSchema = new Schema({
  exam_name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "question",
    },
  ],
});

const Exam = model("exam", examSchema);

module.exports = Exam;
