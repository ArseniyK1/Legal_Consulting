'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          value: 'USER',
          description: 'Пользователь',
        },
        {
          value: 'ADMIN',
          description: 'Администратор',
        },
        {
          value: 'LAWYER',
          description: 'Юрист',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
//
