const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const assignedExamSchema = require("./assignedExamSchema");
require('dotenv').config();

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    instructor: {
      type: Boolean,
      required: true,
      default: false,
    },
    exams: [
      {
        type: assignedExamSchema,
      },
    ],
    created_exams: [
      {
        type: Schema.Types.ObjectId,
        ref: "exam",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = parseInt(process.env.SALT_ITERATION);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('grade').get(function () {
  let acc = 0;
  let count = 0;

  this.exams.forEach((exam) => {
    if (exam.completed) {
      acc += exam.grade;
      count++;
    }
  });

  if (count === 0) {
    return 0;
  }
  return acc / count;
});

userSchema.virtual('completed_exams').get(function () {
  return this.exams.filter((exam) => exam.completed).length;
});

userSchema.virtual('incomplete_exams').get(function () {
  return this.exams.filter((exam) => !exam.completed).length;
});

const User = model("user", userSchema);

module.exports = User;
