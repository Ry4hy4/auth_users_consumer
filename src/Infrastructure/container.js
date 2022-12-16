const { createContainer } = require('instances-container');

// database models
const { users } = require('../../models');

// implemented repository
const UsersRepositorySequelize = require('../Infrastructure/Repository/UsersRepositorySequelize');

// usecase 
const AddUserUsecase = require('../Applications/Usecase/AddUserUsecase');

const container = createContainer();

container.register([
    {
        key: 'UsersRepository',
        Class: UsersRepositorySequelize,
        parameter: {
            injectType: 'destructuring', 
            dependencies: [
                { 
                    name: 'users', 
                    concrete: users 
                },
          ],
        },
    },
]);

container.register([
    {
        key: 'AddUserUsecase',
        Class: AddUserUsecase,
        parameter: {
            injectType: 'destructuring', 
            dependencies: [
                { 
                    name: 'usersRepository', 
                    internal: 'UsersRepository' 
                },
          ],
        },
    },
]);

module.exports = container;