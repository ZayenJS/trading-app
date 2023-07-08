import { ApiOperationOptions } from '@nestjs/swagger';
import pagination from '../../../../config/pagination';

export default {
  create: {
    summary: 'Create a new trade for the logged in user',
  } as ApiOperationOptions,

  findAll: {
    summary: 'Find trades for the logged in user, paginated',
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'The page number to retrieve',
        required: false,
      },
      {
        name: 'per-page',
        in: 'query',
        description: `The number of items per page, default is ${pagination.PER_PAGE}`,
        required: false,
      },
    ],
  } as ApiOperationOptions,

  findOne: {
    summary: 'Find a trade by its id for the logged in user',
  } as ApiOperationOptions,

  update: {
    summary: 'Update a trade by its id for the logged in user',
  } as ApiOperationOptions,

  remove: {
    summary: 'Delete a trade by its id for the logged in user',
  } as ApiOperationOptions,
};
