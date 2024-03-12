const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();

const db = require("../config/connection");
const { Question, Exam, User } = require("../models");
const cleanDB = require("./cleanDB");

const questionData = require("./questions.json");
const userData = require("./users.json");

const populateExamData = (questions) => {
  const topics = {};
  const examData = [];

  // Group questions by topic
  questions.forEach((question) => {
    if (!topics[question.topic]) {
      topics[question.topic] = [];
    }
    topics[question.topic].push(question);
  });

  // Select 5 random questions from each topic
  for (const topic in topics) {
    const topicQuestions = topics[topic];
    const selectedQuestions = [];
    const totalQuestions = Math.min(10, topicQuestions.length);

    while (selectedQuestions.length < totalQuestions) {
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      const randomQuestion = topicQuestions[randomIndex];
      selectedQuestions.push(randomQuestion._id);
      topicQuestions.splice(randomIndex, 1);
    }
    const exam = {
      _id: new mongoose.Types.ObjectId(),
      exam_name: `Exam on ${topic}`,
      topic: topic,
      questions: selectedQuestions,
    };

    examData.push(exam);
  }

  return examData;
};

const populateUserData = async (exams) => {
  const salt = parseInt(process.env.SALT_ITERATION);
  const user = userData[0];
  const examIds = [];

  for (let i = 0; i < exams.length; i++) {
    examIds.push(exams[i]._id);
  }

  // set up first user (gandalf) as instructor/creator of exams
  user.created_exams = examIds;
  const passwordHash = await bcrypt.hash(user.password, salt);
  user.password = passwordHash;

  // set up remaining users
  for (let i = 1; i < userData.length; i++) {
    const user = userData[i]
    const examArray = [];

    for (let j = 0; j < exams.length; j++) {
      if ( Math.random() < 0.5 ) {
        newExam = {
          _id: new mongoose.Types.ObjectId(),
          exam: exams[j]._id,
          grade: 0,
          completed: false,
        };
      } else {
        newExam = {
          _id: new mongoose.Types.ObjectId(),
          exam: exams[j]._id,
          grade: Math.floor(Math.random() * 99 + 1),
          completed: true,
        };
  
      }
      examArray.push(newExam);
    }

    const passwordHash = await bcrypt.hash(userData[i].password, salt);
    user.password = passwordHash;
    user.exams = examArray;
  }

  return userData;
};

db.once("open", async () => {
  try {
    await cleanDB("Question", "questions");
    await cleanDB("Exam", "exams");
    await cleanDB("User", "users");

    for (i = 0; i < questionData.length; i++) {
      questionData[i]._id = new mongoose.Types.ObjectId();
    }

    examData = populateExamData(questionData);
    userExamData = await populateUserData(examData);

    await Question.collection.insertMany(questionData);
    await Exam.collection.insertMany(examData);
    await User.collection.insertMany(userExamData);

    console.log("Seed data has been added!");
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
  process.exit(1);
});
