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
            if(!message.fields.redelivered){
                return channel.nack(message, true, true);
            }
            return channel.nack(message, false, false);
        }
    });
};

module.exports = createConsummer;