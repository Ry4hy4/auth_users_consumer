const amqplib = require('amqplib');
const RabbitCon = require('../RabbitCon');

describe('RabbitCon test', () => {
    describe('createCon, closeCon method test', () => {
        it('should not error when createCon and closeCon', async () => {
            const rabbitCon = new RabbitCon({amqplib, url: 'amqp://localhost'});
            await expect(rabbitCon.createCon()).resolves.not.toThrowError();
            expect(rabbitCon._con).not.toBeFalsy();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
        });
        it('should use already con and not throw error', async () => {
            const rabbitCon = new RabbitCon({amqplib, url: 'amqp://localhost'});
            await expect(rabbitCon.createCon()).resolves.not.toThrowError();
            expect(rabbitCon._con).not.toBeFalsy();
            await expect(rabbitCon.createCon()).resolves.not.toThrowError();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
        });
        it('should not throw error when con closed', async () => {
            const rabbitCon = new RabbitCon({amqplib, url: 'amqp://localhost'});
            await expect(rabbitCon.createCon()).resolves.not.toThrowError();
            expect(rabbitCon._con).not.toBeFalsy();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
        });
    });
    describe('createChannel method test', () => {
        it('should create channel without error', async () => {
            const rabbitCon = new RabbitCon({amqplib, url: 'amqp://localhost'});

            await expect(rabbitCon.createChannel()).resolves.not.toThrowError();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
        });
        it('should create con automatically when con not created', async () => {
            const rabbitCon = new RabbitCon({amqplib, url: 'amqp://localhost'});
            const channel = await rabbitCon.createChannel()

            expect(rabbitCon._con).not.toBeFalsy();
            expect(channel).not.toBeFalsy();
            await expect(rabbitCon.closeCon()).resolves.not.toThrowError();
        });
    });
});