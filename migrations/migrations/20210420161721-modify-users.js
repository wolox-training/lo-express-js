'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role', Sequelize.STRING);
  },

  down: queryInterface => queryInterface.dropTable('users')
};
