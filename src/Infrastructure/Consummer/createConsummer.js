const createConsummer = (channel, container) => {
    channel.prefetch(2);
    channel.consume('auth_users', async message => {
        try {
            const content = JSON.parse(message.content.toString());
            if(content.type === 'CREATE'){
                const addUserUsecase = container.getInstance('AddUserUsecase');
                await addUserUsecase.execute(content.data);
                return channel.ack(message);
            };
            return channel.nack(message, false, false);
        } catch (error) {
            if(message.properties.headers['x-delivery-count'] >= 3){
                return channel.nack(message, false, false);
            }
            return channel.nack(message, true, true);
        }
    });
};

module.exports = createConsummer;