const UsersRepository = require("../../Domain/Users/UsersRepository");

class UsersRepositorySequelize extends UsersRepository{
    constructor({users}){
        super();
        this._users = users;
    }
    async addUser(user){
        await this._users.create(user);
    }
}
module.exports = UsersRepositorySequelize