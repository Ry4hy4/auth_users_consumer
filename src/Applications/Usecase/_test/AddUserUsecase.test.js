const AdduserUsecase = require('../AddUserUsecase');
const UsersRepository = require('../../../Domain/Users/UsersRepository');

describe('AdduserUsecase test', () => {
    it('should orchestrating add user usecase corectly', async () => {
        const payload = {
            id_user: 'testuser', 
            email: 'test@mail.com', 
            password: 'encryptedPass'
        };

        const mockUsersRepository = new UsersRepository();

        mockUsersRepository.addUser = jest.fn(() => {
            return Promise.resolve();
        });

        const adduserUsecase = new AdduserUsecase({
            usersRepository: mockUsersRepository, 
        });

        await adduserUsecase.execute(payload);

        expect(mockUsersRepository.addUser).toBeCalledWith(payload);
    });
});