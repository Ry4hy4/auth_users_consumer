class AddUserUsecase {
    constructor({ usersRepository }){
        this._usersRepository = usersRepository;
    }

    async execute(payload){
        await this._usersRepository.addUser(payload);
    }
}
module.exports = AddUserUsecase;