module.exports = {
  '/users': {
    post: {
      tags: ['User Operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created'
        },
        400: {
          description: 'There are missing fields on the request or password does not meet requirements',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'There are missing fields',
                internal_code: 'bad_request_error'
              }
            }
          }
        },
        409: {
          description: 'There is already a user registered with the email entered.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Trying to create a user that already exists',
                internal_code: 'conflict_error'
              }
            }
          }
        }
      }
    }
  }
};
