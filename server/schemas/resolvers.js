const mongoose = require("mongoose");
const { User, Exam, Question } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Query to retrieve a single user by ID, or all users if no id provided
    users: async (parent, { id }, context) => {
      if (context.user) {
        try {
          const userId = id ? { _id: id } : {};
          return await User.find(userId)
            .populate("created_exams")
            .populate({
              path: "exams",
              populate: { path: "exam", populate: { path: "questions" } },
            });
        } catch (error) {
          if (id) {
            console.error("Invalid user ID!");
            throw new Error(`Failed to get user: ${error.message}`);
          } else {
            console.error("Failed to get all users!");
            throw new Error(`Failed to get all users: ${error.message}`);
          }
        }
      }
      throw AuthenticationError;
    },
    // Query to retrieve the logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          return User.findOne({ _id: context.user._id })
            .populate("created_exams")
            .populate({
              path: "created_exams",
              populate: { path: "questions" },
            })
            .populate({
              path: "exams",
              populate: { path: "exam", populate: { path: "questions" } },
            });
        } catch (error) {
          console.error("Failed to get logged in user!");
          throw new Error(`Failed to get user: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Query to retrieve a specific exam by ID
    getExam: async (parent, { examId }, context) => {
      if (context.user) {
        try {
          return await Exam.findById(examId).populate("questions");
        } catch (error) {
          console.error("Invalid exam ID!");
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
          console.error("Failed to get all exams!");
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
          console.error("Invalid question ID!");
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
          console.error("Failed to get all questions");
          throw new Error(`Failed to get all questions: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Mutation to add a new user
    addUser: async (parent, { username, email, password, instructor }) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          instructor,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Failed to add user!");
        throw new Error(`Failed to add user: ${error.message}`);
      }
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
        try {
          return User.findOneAndDelete({ _id: userId });
        } catch (error) {
          console.error("Failed to delete user!");
          throw new Error(`Failed to delete user: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Mutation to add a new exam
    addExam: async (parent, { examData }, context) => {
      if (context.user) {
        try {
          const exam = await Exam.create(examData);
          return exam;
        } catch (error) {
          console.error("Failed to add exam!");
          throw new Error(`Failed to add exam: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Mutation to add a new question
    addQuestion: async (parent, { questionData }, context) => {
      if (context.user) {
        try {
          const question = await Question.create(questionData);
          return question;
        } catch (error) {
          console.error("Failed to add question!");
          throw new Error(`Failed to add question: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Mutation to assign an exam to a user
    assignExam: async (parent, { examId, userId }, context) => {
      if (context.user) {
        try {
          const newExam = {
            exam: examId,
            grade: 0,
            completed: false,
          };
          return User.findOneAndUpdate(
            { _id: userId },
            { $push: { exams: { ...newExam } } },
            { new: true }
          );
        } catch (error) {
          console.error("Failed to assign exam!");
          throw new Error(`Failed to assign exam: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    // Mutation to update a question
    updateQuestion: async (parent, { questionId, questionData }, context) => {
      if (context.user) {
        try {
          const question = await Question.findByIdAndUpdate(
            { _id: questionId },
            { ...questionData },
            { new: true }
          );
          return question;
        } catch (error) {
          console.error("Failed to update question!");
          throw new Error(`Failed to update question: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    updateExam: async (parent, { examId, examData }, context) => {
      if (context.user) {
        try {
          const exam = await Exam.findByIdAndUpdate(
            { _id: examId },
            { ...examData },
            { new: true }
          ).populate("questions");
          return exam;
        } catch (error) {
          console.error("Failed to update exam!");
          throw new Error(`Failed to update exam: ${error.message}`);
        }
      }
      throw AuthenticationError;
    },
    updateExamGrade: async (parent, { userId, examId, grade }, context) => {
      if (context.user) {
        try {
          // Find the user by userId
          const user = await User.findById(userId).populate({
            path: "exams",
            populate: { path: "exam", populate: { path: "questions" } },
          });

          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }
          console.log("user:", user);
          // Find the index of the exam in the user's exams array
          const examIndex = user.exams.findIndex(
            (exam) => exam.exam._id.toString() == examId
          );

          if (examIndex === -1) {
            console.error("Exam not found");            
            throw new Error("Exam not found");
          }

          // Update the grade of the exam
          user.exams[examIndex].grade = grade;
          user.exams[examIndex].completed = true;

          // Save the updated user
          await user.save();

          // Return the updated user
          return user;
        } catch (error) {
          console.error("Failed to update exam grade");            
          throw new Error(`Failed to update exam grade: ${error.message}`);
        }
      } else {
        throw AuthenticationError;
      }
    },
    // Mutation to delete an exam
    deleteExam: async (parent, { examId }, context) => {
      if (context.user) {
        if (context.user.instructor) {
          try {
            await User.updateMany(
              { "exams.exam": examId },
              { $pull: { exams: { exam: examId } } }
            );
            return Exam.findOneAndDelete({ _id: examId });
          } catch (error) {
            console.error("Failed to delete exam!");
            throw new Error(`"Failed to delete exam: ${error.message}`);
          }
        } else {
          console.error("Must be an instructor to delete an exam!");
          throw new Error("Current user not an instructor");
        }
      }
      throw AuthenticationError;
    },
    deleteQuestion: async (parent, { questionId }, context) => {
      if (context.user) {
        if (context.user.instructor) {
          try {
            return Question.findOneAndDelete({ _id: questionId });
          } catch (error) {
            console.error("Failed to delete question!");
            throw new Error(`"Failed to delete question: ${error.message}`);
          }
        } else {
          console.error("Must be an instructor to delete a question!");
          throw new Error("Current user not a question!");
        }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
