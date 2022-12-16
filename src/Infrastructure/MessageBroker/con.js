const amqplib = require('amqplib');
const RabbitCon = require('./RabbitCon');

const url = process.env.NODE_ENV === 'test' ? process.env.RABBIT_URL_TEST : process.env.RABBIT_URL;
module.exports = new RabbitCon({url, amqplib});