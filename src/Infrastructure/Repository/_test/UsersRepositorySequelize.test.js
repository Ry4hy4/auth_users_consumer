const UsersRepositorySequelize = require('../UsersRepositorySequelize');
const { users } = require('../../../../models');
const { usersCleanTable, getUserById } = require('../../.././../Test/userTestHelper');

describe('UsersRepositorySequelize test', () => {
    afterEach(async () => {
        await usersCleanTable();
    });
    describe('addUser method test', () => {
        it('should addUser corectly', async () => {
            const usersRepositorySequelize = new UsersRepositorySequelize({users});

            const user = {
                id_user: 'test.user',
                email: 'test@mail.com',
                password: '$2b$12$enED54ZQ/qIToLr.AspJHebVJEOpMUXnmF3iGmqhl/QiwKeJTLaNS', //encrypt from superSecretPass
            }

            await usersRepositorySequelize.addUser(user);
            const addedUser = await getUserById(user.id_user)

            expect(addedUser).not.toBeFalsy();
            expect(addedUser.id_user).toEqual(user.id_user);
            expect(addedUser.email).toEqual(user.email);
            expect(addedUser.password).toEqual(user.password);
        });
    });
});