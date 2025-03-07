
const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'tracking-producer',
  brokers: ['my-cluster-kafka-bootstrap.kafka.svc:9092'],
  sasl: {
    mechanism: "scram-sha-512",
    username:  "4b0xm2bbnx2kvyw7l1ixbykmh", // Use env variable for security
    password:  "GMbdA5pjNUNqoiX1BIYxRE4zQob8jZnT",
  }
});

const producer = kafka.producer();
const topic = process.env.KAFKA_TOPIC ;


const getRandomCoordinates = () => {
  const lat = (Math.random() * (37 - 8) + 8).toFixed(6);  
  const lon = (Math.random() * (97 - 68) + 68).toFixed(6); 
  return { latitude: lat, longitude: lon };
};

// Function to generate random tracking data
const getRandomTrackingData = () => {
  const randomDeviceId = `device_${Math.floor(Math.random() * 5) + 1}`; // device_1 to device_5
  const { latitude, longitude } = getRandomCoordinates();

  return {
    deviceId: randomDeviceId,
    latitude: latitude,
    longitude: longitude,
    speed: (Math.random() * (100 - 10) + 10).toFixed(2), // Speed between 10 and 100 km/h
    place: "Delhi",
    timestamp: new Date().toISOString()
  };
};

const sendMessage = async () => {
  await producer.connect();
  console.log(`🚀 Connected to Kafka, publishing to topic: ${topic}`);

  setInterval(async () => {
    const message = getRandomTrackingData();
    await producer.send({
      topic: topic,
      messages: [{ key: message.deviceId, value: JSON.stringify(message) }]
    });
    console.log(`✅ Sent: ${JSON.stringify(message)}`);
  }, 3000); // 🔥 Now publishing every 3 seconds
};

sendMessage().catch(console.error);
