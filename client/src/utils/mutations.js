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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        instructor
      }
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
