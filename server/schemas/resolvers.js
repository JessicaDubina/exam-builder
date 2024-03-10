const { User, Exam, Question } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, { id }, context) => {
      if (context.user) {
        const userId = id ? { _id: id } : {};
        return await User.find(userId).populate("created_exams");
      }
      throw AuthenticationError;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("created_exams");
      }
      throw AuthenticationError;
    },
    // Query to retrieve a specific exam by ID
    getExam: async (parent, { examId }, context) => {
      if (context.user) {
        try {
          return await Exam.findById(examId).populate("questions");
        } catch (error) {
          throw new Error(`Failed to get exam: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Query to retrieve all exams
    allExams: async (parent, args, context) => {
      if (context.user) {
        try {
          return await Exam.find({}).populate("questions");
        } catch (error) {
          throw new Error(`Failed to get all exams: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Query to retrieve a specific question by ID
    getQuestion: async (parent, { questionId }, context) => {
      if (context.user) {
        try {
          return await Question.findById(questionId);
        } catch (error) {
          throw new Error(`Failed to get question: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Query to retrieve all questions
    allQuestions: async (parent, args, context) => {
      if (context.user) {
        try {
          return await Question.find({});
        } catch (error) {
          throw new Error(`Failed to get all questions: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Mutation to add a new user
    addUser: async (parent, { username, email, password, instructor }) => {
      const user = await User.create({ username, email, password, instructor });
      const token = signToken(user);
      return { token, user };
    },
    // Mutation to log in
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
     // Mutation to delete a user
    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: userId });
      }
      throw AuthenticationError;
    },
    // Mutation to add a new exam
    addExam: async (parent, { examData }, context) => {
      if (context.user) {
        const exam = await Exam.create(examData);
        return exam;
      }
      throw AuthenticationError;
    },
    // Mutation to add a new question
    addQuestion: async (parent, { questionData }, context) => {
      if (context.user) {
        const question = await Question.create(questionData);
        return question;
      }
      throw AuthenticationError;
    },
    // Mutation to assign an exam to a user
    assignExam: async (parent, { examId, userId }, context) => {
      if (context.user) {
        const newExam = {
          exam_id: examId,
          grade: 0,
          completed: false
        }
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { exams: { ...newExam } }},
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    // Mutation to delete an exam
    deleteExam: async (parent, { examId }, context) => {
      if (context.user) {
        if (context.user.instructor) {
          await User.updateMany(
            { "exams.exam_id": examId },
            { $pull: { exams: { exam_id: examId } } }
          );
          return Exam.findOneAndDelete({ _id: examId });
        } else {
          console.error("Must be an instructor to delete an exam!");
          throw new Error("User not an instructor");
        };
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
