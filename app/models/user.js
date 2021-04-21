module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: '^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 61]
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'regular',
        values: ['regular', 'admin']
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      underscored: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet);
  };

  return User;
};
