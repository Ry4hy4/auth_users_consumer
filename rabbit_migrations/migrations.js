require('dotenv').config();
const amqplib = require('amqplib');

(async () => {
  try {
    const queue = 'auth_users';
    const exchange = 'open_sso';

    const dead_letter_queue = 'dlq_auth_users';
    const dead_letter_exchange = 'dlx_open_sso';

    const rabbitUrl = process.env.NODE_ENV === 'test' ? process.env.RABBIT_URL_TEST : process.env.RABBIT_URL;
    const conn = await amqplib.connect(rabbitUrl);
    console.log(`connected ${rabbitUrl}`);

    const ch1 = await conn.createChannel();
    console.log(`channel created`);

    await ch1.assertExchange(exchange, 'direct');
    console.log(`exchange ${exchange} created`);

    await ch1.assertExchange(dead_letter_exchange, 'topic', {
      internal: true, 
    });
    console.log(`exchange ${dead_letter_exchange} created`);

    await ch1.assertQueue(queue, {
      arguments: {
        'x-queue-type': 'quorum', 
        'x-dead-letter-strategy': 'at-least-once', 
        'x-overflow': 'reject-publish'
      }, 
      deadLetterExchange: dead_letter_exchange, 
      deadLetterRoutingKey: 'users.auth'
    });
    console.log(`queue ${queue} created`);

    await ch1.assertQueue(dead_letter_queue, {
      arguments: {
        'x-queue-type': 'quorum', 
        'x-quorum-initial-group-size': 1, 
      }, 
    });
    console.log(`queue ${dead_letter_queue} created`);

    await ch1.bindQueue(queue, exchange, 'users');
    console.log(`bindings ${exchange} to  ${queue} with key users successfully`);

    await ch1.bindQueue(dead_letter_queue, dead_letter_exchange, 'users.auth');
    console.log(`bindings ${exchange} to  ${queue} with key users successfully`);

    await conn.close();
    console.log('migrations completed');
  } catch (error) {
    console.log('ERROR', error.message);
    throw error
  }
})();