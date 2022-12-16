const rabbitCon = require('../src/Infrastructure/MessageBroker/con');
const rabbitTestHelper = {
    sendToExchange: async (routingKey, data) => {
        const channel = await rabbitCon.createChannel();
        await channel.publish('open_sso', routingKey, Buffer.from(JSON.stringify(data)));  
        await channel.close();
    }, 
    purgeQueue: async() => {
        const channel = await rabbitCon.createChannel();
        await channel.purgeQueue('auth_users');
        await channel.close();
    }, 
    getOneDataDLq: async() => {
        const channel = await rabbitCon.createChannel();
        const res = await channel.get('dlq_auth_users');
        return {
            routingKey: res.fields.routingKey, 
            data: JSON.parse(res.content.toString())
        };
    }, 
    purgeDlxQueue: async() => {
        const channel = await rabbitCon.createChannel();
        await channel.purgeQueue('dlq_auth_users');
        await channel.close();
    }, 
};

module.exports = rabbitTestHelper;