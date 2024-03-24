'use strict';
const { faker } = require('@faker-js/faker');
const { genSalt, hash } = require('bcrypt');

async function password() {
  const salt = await genSalt(10);
  return hash('test', salt);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = await Promise.all([
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: 3,
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
        roleId: faker.number.int({ min: 1, max: 3 }),
      },
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        login: faker.internet.userName({ firstName: 'test' }),
        password: await password(),
        phonenumber: faker.phone.number(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        contact_email: faker.internet.email(),
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