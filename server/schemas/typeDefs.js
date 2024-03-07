const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

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
  
  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]

    getExam(examId: ID!): Exam
    
    allExams: [Exam!]!
    
    getQuestion(questionId: ID!): Question
    
    allQuestions: [Question!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;