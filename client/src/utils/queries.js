import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      username
      email
      instructor
      exams {
        _id
        exam_name
        topic
      }
      created_exams {
        _id
        exam_name
        topic
      }
      password
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
}`;
