import mqtt from "mqtt";

const brokerUrl = "mqtt://localhost";
const topic = "test/topic";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Publisher connected to MQTT broker");

  // Publish a message
  const message = JSON.stringify({
    writeBytes: 220,
    fileName: "path/to/video/12.mkv",
    status: true,
  });

  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error("Failed to publish message:", err);
    } else {
      console.log(`Message published to topic "${topic}": ${message}`);
    }
    client.end();
  });
});

client.on("error", (err) => {
  console.error("Publisher connection error:", err);
});
