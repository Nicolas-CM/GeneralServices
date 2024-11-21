// src/Utils/StompService.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const URL = "http://localhost:8080/generalservicesplatform/ws"; 

class StompService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(URL),
      connectHeaders: {
        login: "guest",
        passcode: "guest"
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    this.subscriptions = {};
  }

  connect(username, onMessageReceived) {
    this.client.onConnect = (frame) => {
      console.log("Connected: " + frame);
      const subscription = this.client.subscribe(`/topic/notifications/${username}`, onMessageReceived);
      this.subscriptions[username] = subscription;
    };

    this.client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    this.client.activate();
  }

  unsubscribe(username) {
    const subscription = this.subscriptions[username];
    if (subscription) {
      subscription.unsubscribe();
      delete this.subscriptions[username];
    }
  }
}

export default new StompService();