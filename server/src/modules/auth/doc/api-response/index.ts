export default {
  checkUser: {
    200: {
      status: 200,
      description: 'The user is logged in',
    },
    401: {
      status: 401,
      description: 'The user is not logged in',
    },
  },

  token: {
    200: {
      status: 200,
      description: 'The token has been successfully generated and sent.',
    },
    400: {
      status: 400,
      description: 'The email is missing in the request body',
    },
    404: {
      status: 404,
      description: 'The user with the given email does not exist',
    },
    500: {
      status: 500,
      description:
        'An error occurred while generating the token or sending it by email',
    },
  },

  login: {
    200: {
      status: 200,
      description:
        'The user has been successfully logged in or was already logged',
    },
    400: {
      status: 400,
      description: 'Error related to the email or token (missing, invalid...)',
    },
    404: {
      status: 404,
      description: 'The user with the given email does not exist',
    },
  },

  register: {
    201: {
      status: 201,
      description: 'The user has been successfully created.',
    },
    400: {
      status: 400,
      description: 'A required field is missing in the request body',
    },
    500: {
      status: 500,
      description: 'An error occurred while creating the user',
    },
  },

  logout: {
    200: {
      status: 200,
      description: 'The user has been successfully logged out.',
    },
  },
};
