module.exports = {
  userEmail: {
    type: 'string',
    example: 'tom.engels@wolox.ar'
  },
  userPassword:{
    type: 'string',
    example: 'luis12345'
  },
  userFirstName:{
    type: 'string',
    example: 'Luis'
  },
  userLastName:{
    type: 'string',
    example: 'Ochoa'
  },
  User: {
    type: 'object',
    properties: {
      firstName: {
        $ref: '#/components/schemas/userFirstName'
      },
      lastName: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password:{
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
