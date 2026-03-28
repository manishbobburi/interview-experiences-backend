const { createClient } = require("redis");
const  ServerConfig  = require("./server-config");

const client = createClient({
    url: ServerConfig.REDIS_URL
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

async function connectRedis() {
    if(!client.isOpen) {
        await client.connect();
        console.log('Redis connected');
    }
}

module.exports = {
    redisClient: client,
    connectRedis,
}