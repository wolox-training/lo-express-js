exports.formatUserOutput = payload => {
  const { id, firstName, lastName, email } = payload;
  return { id, first_name: firstName, last_name: lastName, email };
};
