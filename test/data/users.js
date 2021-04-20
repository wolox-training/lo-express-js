exports.user = {
  first_name: 'lucho',
  last_name: 'lopez',
  email: 'lucho.ochoa@wolox.co',
  password: 'luis1023123'
};

exports.repeatedUser = {
  first_name: 'luis',
  last_name: 'ochoa',
  email: 'luis.ochddoa@wolox.co',
  password: 'luis1023123'
};

exports.passwordUser = {
  first_name: 'luis',
  last_name: 'ochoa',
  email: 'luis.ochoa@wolox.co',
  password: 'luis10'
};

exports.missingPropertyUser = {
  last_name: 'ochoa',
  email: 'luis.ochoa@wolox.co',
  password: 'luis1asda0'
};

exports.signUpUser = {
  email: 'test.test@wolox.co',
  password: 'luis12345',
  first_name: 'Luis',
  last_name: 'Ochoa'
};

exports.wrongDomainUser = {
  email: 'test.test@wolox.au',
  password: 'luis12345',
  first_name: 'Luis',
  last_name: 'Ochoa'
};

exports.adminUser = {
  email: 'test.test@wolox.co',
  password: 'luis12345',
  first_name: 'Luis',
  last_name: 'Ochoa',
  role: 'admin'
};

exports.pagination = {
  page: 1,
  limit: 1
};
