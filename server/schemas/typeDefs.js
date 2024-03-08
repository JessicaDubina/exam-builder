const typeDefs = `

  type Question {
    _id: ID
    question_text: String
    answer_choices: [String]
    correct_answer: Int
    topic: String
    difficulty: String
  } 

  type Exam {
    _id: ID
    exam_name: String
    topic: String
    questions: [Question]
  }
  
  type User {
    _id: ID
    username: String
    email: String
    password: String
    instructor: Boolean
    exams: [Exam]
    created_exams: [Exam]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    me: User
    getExam(examId: ID!): Exam
    allExams: [Exam]
    getQuestion(questionId: ID!): Question
    allQuestions: [Question]
  }

  input examData {
    exam_name: String
    topic: String
    questions: [ID]
  }

  input questionData {
    question_text: String
    answer_choices: [String]
    correct_answer: Int
    topic: String
    difficulty: String    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExam(examData: examData!): Exam
    addQuestion(questionData: questionData!): Question
  }
`;

module.exports = typeDefs;