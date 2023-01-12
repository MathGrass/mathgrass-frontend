import {Client} from "@stomp/stompjs";

const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: true
});

client.onConnect = function () {
    console.log("Websockets connected successfully!")
    console.log("Try sending message...")
    client.publish({
        destination: '/app/sendMessage',
        body: 'Test'
    })
    console.log("Message sent successfully!")
}

client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
};

export default client;
