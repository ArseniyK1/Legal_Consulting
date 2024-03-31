// import { faker } from '@faker-js/faker';
// import { User } from '../src/user/entities/user.entity';
// import { genSalt, hash } from 'bcrypt';
//
// async function password() {
//   const salt = await genSalt(10);
//   return hash('test', salt);
// }
//
// export const userSeed = async () => {
//   const user = new User();
//   user.first_name = faker.person.firstName();
//   user.last_name = faker.person.lastName();
//   user.middle_name = faker.person.middleName();
//
//   user.login = faker.internet.userName({ firstName: 'test' });
//   user.password = await password();
//   user.phonenumber = faker.phone.number();
//
//   user.date_of_birth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
//   user.contact_email = faker.internet.email();
//   user.role = faker.number.int({ min: 1, max: 3 });
//
//   return user;
// };
//
// export const userseed = {
//   first_name: faker.person.firstName(),
//   last_name: faker.person.lastName(),
//   middle_name: faker.person.middleName(),
//
//   login: faker.internet.userName({ firstName: 'test' }),
//   password: 'test',
//   phonenumber: faker.phone.number(),
//
//   date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
//   contact_email: faker.internet.email(),
//   role: faker.number.int({ min: 1, max: 3 }),
// };
