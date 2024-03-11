import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
query users($usersId: ID) {
  users(id: $usersId) {
    _id
    username
    email
    instructor
    created_exams {
      _id
      exam_name
      topic
      questions {
        _id
        question_text
        topic
        answer_choices
        difficulty
        correct_answer
      }
    }
    exams {
      _id
      exam {
        _id
        exam_name
        topic
        questions {
          _id
          question_text
          topic
          difficulty
          answer_choices
          correct_answer
        }
      }
      completed
      grade
    }
    grade
  }
}
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      instructor
      exams {
        _id
        exam {
          _id
          exam_name
          topic
          questions {
            question_text
            difficulty
            answer_choices
            correct_answer
          }
        }
        completed
        grade
      }
      created_exams {
        _id
        exam_name
        topic
        questions {
          _id
          question_text
          topic
        }
      }
    }
  }
`;

export const GET_EXAM = gql`
  query getExam($examId: ID!) {
    getExam(examId: $examId) {
      _id
      exam_name
      topic
      questions {
        _id
        question_text
        answer_choices
        correct_answer
        difficulty
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
        question_text
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
