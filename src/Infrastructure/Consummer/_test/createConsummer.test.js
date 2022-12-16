const rabbitCon = require('../../MessageBroker/con');
const createConsummer = require('../createConsummer');
const container = require('../../container');

const rabbitTestHelper = require('../../../../Test/rabbitTestHelper');
const userTestHelper = require('../../../../Test/userTestHelper');

describe('createConsummer test', () => {
    afterAll(async () => {
        await rabbitCon.closeCon();
    });
    beforeEach(async () => {
        await rabbitTestHelper.purgeQueue();
        await rabbitTestHelper.purgeDlxQueue();
    });
    afterEach(async ()=> {
        await userTestHelper.usersCleanTable();
    });
    describe('CREATE routing key test', () => {
        it('should insert data corectly', async () => {
            const payload = {
                type: 'CREATE', 
                data: {
                    id_user: 'testuser', 
                    email: 'test@mail.com', 
                    password: 'encryptedPass'
                }, 
            };
            const channel = await rabbitCon.createChannel();
            createConsummer(channel, container);

            await rabbitTestHelper.sendToExchange('users', payload);
            
            
            await new Promise((r) => setTimeout(r, 4000));

            const insertedUser = await userTestHelper.getUserById(payload.data.id_user);
            expect(insertedUser).not.toBeFalsy();
            expect(insertedUser.id_user).toEqual(payload.data.id_user);
            expect(insertedUser.email).toEqual(payload.data.email);
            expect(insertedUser.password).toEqual(payload.data.password);
        });
        it('should throw data to dlq corectly when usecase error', async () => {
            const payload = {
                type: 'CREATE', 
                data: {
                    id_user: 'testuser', 
                    email: 'test@mail.com', 
                    password: 'encryptedPass'
                }, 
            };
            const channel = await rabbitCon.createChannel();
            createConsummer(channel, container);

            await rabbitTestHelper.sendToExchange('users', payload);
            await rabbitTestHelper.sendToExchange('users', payload);
            
            
            await new Promise((r) => setTimeout(r, 4000));

            const dlqData = await rabbitTestHelper.getOneDataDLq();
            expect(dlqData.routingKey).toEqual('users.auth');
            expect(dlqData.data.type).toEqual(payload.type);
            expect(dlqData.data.data.id_user).toEqual(payload.data.id_user);
            expect(dlqData.data.data.email).toEqual(payload.data.email);
            expect(dlqData.data.data.password).toEqual(payload.data.password);
        });
        it('should throw data to dlq corectly when type not match route', async () => {
            const payload = {
                type: 'UNHANDLED', 
                data: {
                    id_user: 'testuser', 
                    email: 'test@mail.com', 
                    password: 'encryptedPass'
                }, 
            };
            const channel = await rabbitCon.createChannel();
            createConsummer(channel, container);

            await rabbitTestHelper.sendToExchange('users', payload);
            
            
            await new Promise((r) => setTimeout(r, 4000));

            const dlqData = await rabbitTestHelper.getOneDataDLq();
            expect(dlqData.routingKey).toEqual('users.auth');
            expect(dlqData.data.type).toEqual(payload.type);
            expect(dlqData.data.data.id_user).toEqual(payload.data.id_user);
            expect(dlqData.data.data.email).toEqual(payload.data.email);
            expect(dlqData.data.data.password).toEqual(payload.data.password);
        });
    });
});