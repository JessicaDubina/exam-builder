const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

//TODO: move this out later --need for query to run so backend will start
const DATABASE = {
  users: [{
    _id: 1,
    username: 'userOne',
    email: 'user.one@example.com',
    password: '1234',
  }, {
    _id: 2,
    username: 'userTwo',
    email: 'user.two@example.com',
    password: '1234',
  }],
}

const resolvers = {
    Query: {
      users: DATABASE.users,
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