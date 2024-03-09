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
    addUser: async (parent, { username, email, password, instructor }) => {
      const user = await User.create({ username, email, password, instructor });
      const token = signToken(user);
      return { token, user };
    },
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
    addExam: async (parent, { examData }, context) => {
      if (context.user) {
        const exam = await Exam.create(examData);
        return exam;
      }
      throw AuthenticationError;
    },
    addQuestion: async (parent, { questionData }, context) => {
      if (context.user) {
        const question = await Question.create(questionData);
        return question;
      }
      throw AuthenticationError;
    },
    assignExam: async (parent, { examId }, context) => {
      if (context.user) {
        const newExam = {
          exam_id: examId,
          grade: 0,
          completed: false
        }
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { exams: { ...newExam } }},
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
