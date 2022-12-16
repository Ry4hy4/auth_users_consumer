const { users } = require('../models/index');

const userTestHelper = {
    usersCleanTable : async () => {
        await users.destroy({
            where : {},
        });
    }, 
    getUserById: async (id) => {
        return users.findOne({
            where: {
                id_user: id
            }
        });
    }
};

module.exports = userTestHelper;