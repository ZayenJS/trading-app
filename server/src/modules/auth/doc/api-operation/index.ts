export default {
  token: {
    tags: ['Auth'],
    summary:
      'Generate a token for a registered user that will be sent by email',
  },

  login: {
    tags: ['Auth'],
    summary: 'Login a user with the email and token sent by email',
  },

  register: {
    tags: ['Auth'],
    summary: 'Register a new user',
  },

  logout: {
    tags: ['Auth'],
    summary: 'Logout the logged in user',
  },
};
