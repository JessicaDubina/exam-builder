import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        instructor
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $instructor: Boolean!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      instructor: $instructor
    ) {
      token
      user {
        username
        email
        instructor
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      _id
      username
      email
      instructor
    }
  }
`;

export const ADD_EXAM = gql`
  mutation addExam($examData: examData!) {
    addExam(examData: $examData) {
      _id
      exam_name
      topic
      questions {
        _id
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($questionData: questionData!) {
    addQuestion(questionData: $questionData) {
      topic
      question_text
      difficulty
      answer_choices
      correct_answer
    }
  }
`;

export const ASSIGN_EXAM = gql`
  mutation assignExam($examId: String!, $userId: String!) {
    assignExam(examId: $examId, userId: $userId) {
      _id
      username
      email
      instructor
      exams {
        _id

        completed
        grade
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($questionId: String!, $questionData: questionData!) {
    updateQuestion(questionId: $questionId, questionData: $questionData) {
      _id
      question_text
      topic
      difficulty
      answer_choices
      correct_answer
    }
  }
`;

export const UPDATE_EXAM = gql`
  mutation updateExam($examId: String!, $examData: examData!) {
    updateExam(examId: $examId, examData: $examData) {
      _id
      exam_name
      topic
      questions {
        _id
        question_text
      }
    }
  }
`;

export const DELETE_EXAM = gql`
  mutation deleteExam($examId: String!) {
    deleteExam(examId: $examId) {
      _id
      exam_name
      topic
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($questionId: String!) {
    deleteQuestion(questionId: $questionId) {
      question_text
      topic
      difficulty
    }
  }
`;
