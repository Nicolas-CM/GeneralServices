// src/Utils/StompService.js
import { Client } from "@stomp/stompjs";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sock... Remove this comment to see the full error message
import SockJS from "sockjs-client";

const URL = "http://localhost:3000/generalservicesplatform/ws";

class StompService {
  client: any;
  isConnected: any;
  subscriptions: any;
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(URL),
      connectHeaders: {
        login: "guest",
        passcode: "guest",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    this.subscriptions = {};
    this.isConnected = false;
  }

  connect(onConnectCallback: any) {
    if (this.isConnected) {
      console.warn("STOMP client is already connected.");
      return;
    }

    this.client.onConnect = (frame: any) => {
      console.log("Connected: " + frame);
      this.isConnected = true;

      if (onConnectCallback) {
        onConnectCallback();
      }
    };

    this.client.onStompError = function (frame: any) {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.client.activate();
  }

  subscribeToNotifications(username: any, onNotificationReceived: any) {
    if (!this.isConnected) {
      console.error("STOMP client is not connected. Cannot subscribe.");
      return;
    }

    const subscriptionKey = `notifications_${username}`;
    if (this.subscriptions[subscriptionKey]) {
      console.warn(`Already subscribed to notifications for ${username}`);
      return;
    }

    const subscription = this.client.subscribe(
      `/topic/notifications/${username}`,
      onNotificationReceived
    );
    this.subscriptions[subscriptionKey] = subscription;
  }

  subscribeToChat(username: any, solicitudId: any, onChatMessageReceived: any) {
    if (!this.isConnected) {
      console.error("STOMP client is not connected. Cannot subscribe.");
      return;
    }

    const subscriptionKey = `chat_${username}_${solicitudId}`;
    if (this.subscriptions[subscriptionKey]) {
      console.warn(`Already subscribed to chat for ${username} and solicitudId ${solicitudId}`);
      return;
    }

    const subscription = this.client.subscribe(
      `/topic/chat/${username}/${solicitudId}`,
      onChatMessageReceived
    );
    this.subscriptions[subscriptionKey] = subscription;
  }

  unsubscribe(subscriptionKey: any) {
    const subscription = this.subscriptions[subscriptionKey];
    if (subscription) {
      subscription.unsubscribe();
      delete this.subscriptions[subscriptionKey];
    } else {
      console.warn(`No active subscription found for key: ${subscriptionKey}`);
    }
  }

  disconnect() {
    if (this.isConnected) {
      this.client.deactivate();
      this.subscriptions = {};
      this.isConnected = false;
      console.log("Disconnected from STOMP server.");
    }
  }
}

export default new StompService();
