const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/;

exports.userSchema = {
  firstName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'firstName is required'
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'lastName is required'
    }
  },
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'email is required'
    },
    custom: {
      options: email => emailRegex.test(email),
      errorMessage: 'email not part of Wolox'
    }
  },
  password: {
    isEmpty: {
      negated: true,
      errorMessage: 'password is required'
    },
    isLength: {
      errorMessage: 'Password should be at least 8 characters',
      options: { min: 8 }
    },
    isAlphanumeric: true,
    errorMessage: 'Password only should have alphanumeric characters'
  }
};

exports.signInSchema = {
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'email is required'
    },
    custom: {
      options: email => emailRegex.test(email),
      errorMessage: 'email not part of Wolox'
    },
    errorMessage: 'something is wrong with the email'
  },
  password: {
    isEmpty: {
      negated: true,
      errorMessage: 'password is required'
    },
    isLength: {
      errorMessage: 'Password should be at least 8 characters',
      options: { min: 8 }
    }
  }
};
