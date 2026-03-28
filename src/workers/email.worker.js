const { RabbitMQ } = require("../config");
const { sendEmail } = require("../services/email.service");

async function startWorker() {
  try {
    await RabbitMQ.connect();
    
    const queue = 'email_verification';
    const channel = RabbitMQ.channel;

    await channel.assertQueue(queue, { durable: true });

    channel.prefetch(1);

    console.log(`[*] Worker started. Listening for messages in: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`[x] Processing Order ID: ${data.to}`);
        await sendEmail(data.to, data.subject, data.token);

        channel.ack(msg);

      } catch (error) {
        console.error(`[!] Error processing message:`, error);
        
        const headers = msg.properties.headers || {};
        const retryCount = (headers['x-retry-count'] || 0) + 1;

        if (retryCount > 3) {
            console.error(`[!] Max retries reached for message. Dropping.`);
            channel.ack(msg);
        } else {
            console.log(`[!] Retrying message in ${retryCount * 3} seconds... (Attempt ${retryCount})`);
            setTimeout(async () => {
                 await channel.sendToQueue(queue, msg.content, {
                     headers: { ...headers, 'x-retry-count': retryCount },
                     persistent: true
                 });
                 channel.ack(msg);
            }, 3000 * retryCount);
        }
      }
    }, {
      noAck: false 
    });

  } catch (err) {
    console.error("Failed to start worker:", err);
    setTimeout(startWorker, 5000);
  }
}

startWorker();

module.exports = {
  startWorker,
}