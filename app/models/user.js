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
      },
      position: {
        type: DataTypes.STRING,
        defaultValue: 'Developer',
        values: ['Developer', 'Lead', 'TL', 'EM', 'HEAD', 'CEO']
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      underscored: true
    }
  );

  User.obtainPosition = score => {
    let position; // eslint-disable-line
    if (score <= 5) position = 'Developer';
    else if (score <= 9) position = 'Lead';
    else if (score <= 19) position = 'TL';
    else if (score <= 29) position = 'EM';
    else if (score <= 49) position = 'HEAD';
    else position = 'CEO';

    return position;
  };

  User.associate = models => {
    User.hasMany(models.Weet);
  };

  return User;
};
