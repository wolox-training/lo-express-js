exports.formatUserInput = payload => {
  const { first_name, last_name, email, password } = payload;
  return { firstName: first_name, lastName: last_name, email, password };
};
