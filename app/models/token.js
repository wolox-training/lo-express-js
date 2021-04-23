module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      }
    },
    {
      timestamps: true,
      tableName: 'tokens',
      underscored: true
    }
  );
  Token.associate = models => {
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Token;
};
