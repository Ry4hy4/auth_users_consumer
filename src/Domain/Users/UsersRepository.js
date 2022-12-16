class UsersRepository {
    addUser(user){
        throw new Error('Users_Repository_Is_Abstract_Class')
    }
}

module.exports = UsersRepository;