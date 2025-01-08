import mqtt from 'mqtt';
const brokerUrl = 'mqtt://localhost';
const topic = 'test/topic';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Consumer connected to MQTT broker');

  // Subscribe to the topic
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log(`Subscribed to topic "${topic}"`);
    }
  });
});

// Handle incoming messages
client.on('message', (receivedTopic, payload) => {
  if (receivedTopic === topic) {
    console.log(
      `Message received on topic "${receivedTopic}": ${payload.toString()}`
    );
  }
});

client.on('error', (err) => {
  console.error('Consumer connection error:', err);
});
