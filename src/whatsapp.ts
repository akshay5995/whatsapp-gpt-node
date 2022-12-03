import { Client, LocalAuth } from "whatsapp-web.js";
import fetch from "node-fetch";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false },
});

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log("QR RECEIVED", qr);
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessful
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("READY");
});

client.on("message", async (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  } else if (msg.body.includes("!openai")) {
    const msgBody = msg.body.replace("!openai", "");
    const response = await fetch(`http://localhost:5001/chat?q=${msgBody}`);
    const body = await response.text();
    msg.reply(body);
  }
});

client.initialize();
