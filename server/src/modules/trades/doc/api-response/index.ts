export default {
  create: {
    201: {
      status: 201,
      description: 'The trade has been successfully created.',
    },
    400: {
      status: 400,
      description: 'A required field is missing in the request body',
    },
    401: {
      status: 401,
      description: 'Needs authentication to access this resource',
    },
  },

  findAll: {
    200: {
      status: 200,
      description: 'The trades have been successfully found and returned.',
    },
  },

  findOne: {
    200: {
      status: 200,
      description: 'The trade has been successfully found and returned.',
    },
    401: {
      status: 401,
      description: 'Needs authentication to access this resource',
    },
  },

  update: {
    200: {
      status: 200,
      description: 'The trade has been successfully updated.',
    },
    403: {
      status: 403,
      description: 'The trade does not belong to the logged in user',
    },
    404: {
      status: 404,
      description: 'The trade does not exist',
    },
  },

  remove: {
    200: {
      status: 200,
      description: 'The trade has been successfully deleted.',
    },
    403: {
      status: 403,
      description: 'The trade does not belong to the logged in user',
    },
    404: {
      status: 404,
      description: 'The trade does not exist',
    },
  },
};
