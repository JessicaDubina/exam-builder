import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users($usersId: ID) {
    users(id: $usersId) {
      username
      email
      instructor
      exams {
        completed
        exam_id
        grade
      }
      created_exams {
        exam_name
        topic
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      username
      email
      instructor
      created_exams {
        _id
        exam_name
        topic
      }
      exams {
        exam_id
        completed
        grade
      }
    }
  }
`;

export const GET_EXAM = gql`
  query getExam($examId: ID!) {
    getExam(examId: $examId) {
      exam_name
      topic
      questions {
        _id
        answer_choices
        correct_answer
        difficulty
        question_text
      }
    }
  }
`;

export const ALL_EXAMS = gql`
  query allExams {
    allExams {
      _id
      exam_name
      topic
      questions {
        _id
        question_text
        answer_choices
      }
    }
  }
`;

export const GET_QUESTION = gql`
  query getQuestion($questionId: ID!) {
    getQuestion(questionId: $questionId) {
      answer_choices
      correct_answer
      difficulty
      question_text
      topic
    }
  }
`;

export const ALL_QUESTIONS = gql`
  query allQuestions {
    allQuestions {
      _id
      answer_choices
      correct_answer
      difficulty
      question_text
      topic
    }
  }
`;
