exports.formatWeetOutput = payload => {
  const { id, content, userId, updatedAt, createdAt } = payload;
  return { id, content, user_id: userId, updated_at: updatedAt, created_at: createdAt };
};

exports.formatRateOutput = payload => {
  const { id, ratingUserId, score, createdAt, updatedAt, weetId } = payload;
  return {
    id,
    weet_id: weetId,
    rating_user_id: ratingUserId,
    score,
    created_at: createdAt,
    updated_at: updatedAt
  };
};
