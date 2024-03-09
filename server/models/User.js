const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const assignedExamSchema = new Schema(
  {
    exam_id: {
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
  }
)

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
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
