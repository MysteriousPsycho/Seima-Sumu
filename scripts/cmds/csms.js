const axios = require("axios");

module.exports = {
  config: {
    name: "csms",
    aliases: [],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Send an SMS message.",
    longDescription: "Sends an SMS message using the provided API.",
    category: "utility",
    guide: {
      en: "{p}sms <phone_number> <message>"
    }
  },
  onStart: async function ({ message, args, api, event }) {
    // Obfuscated author name check
    const checkAuthor = Buffer.from('TWFoaS0t', 'base64').toString('utf8');
    if (this.config.author !== checkAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    if (args.length < 2) {
      return api.sendMessage("❌ | Please provide a phone number and a message.", event.threadID, event.messageID);
    }

    const phoneNumber = args[0];
    const smsMessage = args.slice(1).join(" ");
    const smsApiUrl = `https://api.versionx10.co/Sms/Backend/Master.php?key=Trial&phn=${encodeURIComponent(phoneNumber)}&msg=${encodeURIComponent(smsMessage)}`;

    api.sendMessage("⏳ | Sending your message...", event.threadID, event.messageID);

    try {
      const smsResponse = await axios.get(smsApiUrl);

      if (smsResponse.data.status === "success") {
        api.sendMessage("✅ | Message sent successfully.", event.threadID, event.messageID);
      } else {
        api.sendMessage(`❌ | Failed to send message: ${smsResponse.data.error}`, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
};