'use strict';
const { faker } = require('@faker-js/faker');
const { genSalt, hash } = require('bcrypt');

async function password() {
  const salt = await genSalt(10); // Create salt using the bcrypt library
  return hash('test', salt); // Return the hashed password asynchronously
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Use Promise.all to await all the asynchronous password generation operations
    const usersData = await Promise.all([
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        second_name: faker.person.firstName(),
        middle_name: faker.person.firstName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
    ]);

    // Now that all passwords are generated, bulk insert the usersData
    await queryInterface.bulkInsert('user', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};

// SectionRepository, ProductRepository, OfferRepository, ProductPropertyRepository, UserRepository, CartRepository,
OrderRepository.