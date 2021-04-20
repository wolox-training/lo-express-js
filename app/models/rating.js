module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ratingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rating_user_id'
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'weet_id'
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      timestamps: true,
      tableName: 'ratings',
      freezeTableName: true,
      underscored: true
    }
  );
  Rating.associate = models => {
    Rating.belongsTo(models.User, { foreignKey: 'ratingUserId' });
    models.User.hasMany(Rating);

    Rating.belongsTo(models.Weet, { foreignKey: 'weetId' });
    models.Weet.hasMany(Rating);
  };

  return Rating;
};
