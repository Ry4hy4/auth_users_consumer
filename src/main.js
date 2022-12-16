require('dotenv').config();
const createConsummer = require('./Infrastructure/Consummer/createConsummer');
const container = require('./Infrastructure/container');
const rabbitCon = require('./Infrastructure/MessageBroker/con')

const main = async () => {
    const channel = await rabbitCon.createChannel();
    createConsummer(channel, container);
    console.log('consumer started')
}

main()