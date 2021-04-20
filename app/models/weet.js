module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
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
      tableName: 'weets',
      freezeTableName: true,
      underscored: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId' });
    models.User.hasMany(Weet);
  };

  return Weet;
};
