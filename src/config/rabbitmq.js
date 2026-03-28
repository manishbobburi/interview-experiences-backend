const amqp = require("amqplib");
const { RABBITMQ_URL } = require("./server-config");

class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.connecting = null;
    }

    async connect() {
        if (this.channel) return;

        if (!this.connecting) {
            this.connecting = (async () => {
                try {
                    this.connection = await amqp.connect(RABBITMQ_URL || "amqp://localhost");

                    this.connection.on("error", (err) => {
                        console.error("RabbitMQ connection error:", err);
                        this.connection = null;
                        this.channel = null;
                    });

                    this.connection.on("close", () => {
                        console.warn("RabbitMQ connection closed");
                        this.connection = null;
                        this.channel = null;
                    });

                    this.channel = await this.connection.createChannel();

                    console.log("RabbitMQ Connected");
                } finally {
                    this.connecting = null;
                }
            })();
        }

        return this.connecting;
    }

    async publish(queue, message) {
        if (!this.channel) {
            await this.connect();
        }

        await this.channel.assertQueue(queue, { durable: true });

        const success = this.channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            { persistent: true }
        );

        if (!success) {
            console.warn("Message buffer full (backpressure)");
        }
    }
}

module.exports = new RabbitMQService();