const { User, Exams, Questions } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
        return await User.find({});
    },
    // Query to retrieve a specific exam by ID
    getExam: async (parent, { examId }) => {
        try {
            return await Exams.findById(examId);
        } catch (error) {
            throw new Error(`Failed to get exam: ${error.message}`);
        }
    },
    // Query to retrieve all exams
    allExams: async () => {
        try {
            return await Exams.find({});
        } catch (error) {
            throw new Error(`Failed to get all exams: ${error.message}`);
        }
    },
    // Query to retrieve a specific question by ID
    getQuestion: async (parent, { questionId }) => {
        try {
            return await Questions.findById(questionId);
        } catch (error) {
            throw new Error(`Failed to get question: ${error.message}`);
        }
    },
    // Query to retrieve all questions
    allQuestions: async () => {
        try {
            return await Questions.find({});
        } catch (error) {
            throw new Error(`Failed to get all questions: ${error.message}`);
        }
    },
},
    
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
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
    },
};

module.exports = resolvers;