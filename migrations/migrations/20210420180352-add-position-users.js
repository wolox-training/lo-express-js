'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'position', Sequelize.STRING);
  },

  down: queryInterface => queryInterface.removeColumn('users', 'position')
};
