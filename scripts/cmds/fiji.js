const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "fiji",
    aliases: [],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Generate an image using the Fiji API based on a prompt.",
    longDescription: "Generates an image using the provided prompt via the Fiji API.",
    category: "fun",
    guide: "{p}fiji <prompt>",
  },
  onStart: async function ({ message, args, api, event }) {
    // Obfuscated author name check
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 105, 45, 45);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("❌ | You need to provide a prompt.", event.threadID);
    }

    api.sendMessage("Please wait, we're generating your image...", event.threadID, event.messageID);

    try {
      const fijiApiUrl = `https://upol-v1-horrorapis.onrender.com/fake-niji?prompt=${encodeURIComponent(prompt)}`;

      const fijiResponse = await axios.get(fijiApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_fiji_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(fijiResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      api.sendMessage({
        body: "",
        attachment: stream
      }, event.threadID, () => {
        // Clean up the file after sending
        fs.unlinkSync(imagePath);
      });
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
};