class RabbitCon {
    constructor({amqplib, url}){
        this._amqplib = amqplib;
        this._conUrl = url;
    }
    async createCon(){
        if(!this._con){
            this._con = await this._amqplib.connect(this._conUrl);
        }
    }
    async closeCon(){
        if(this._con){
            await this._con.close();
            this._con = null;
        }
    }
    async createChannel(){
        await this.createCon();
        const channel = await this._con.createChannel();
        return channel;
    }
}

module.exports = RabbitCon;