exports.formatWeetOutput = payload => {
  const { id, content, userId, updatedAt, createdAt } = payload;
  return { id, content, user_id: userId, updated_at: updatedAt, created_at: createdAt };
};
