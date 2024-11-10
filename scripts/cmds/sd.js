const axios = require('axios');

module.exports = {
  config: {
    name: "sd",
    version: "10.5",
    author: "ArYAN",
    shortDescription: { en: 'Converts text to image' },
    longDescription: { en: "Generates images based on provided text using the API." },
    category: "image",
    countDown: 10,
    role: 0,
    guide: { en: '{pn} your prompt' }
  },

  onStart: async function ({ api, event, args, message }) {
    const startTime = new Date().getTime();
    const text = args.join(" ");

    if (!text) {
      return message.reply("🔴 Invalid Usage\n━━━━━━━━━━━━\n\nPlease provide some prompts\n\nExample:\nCreate a 3D illustration of an animated character sitting casually on top of a social media logo \"SocialMedia\". The character must wear casual modern clothing such as jeans jacket and sneakers shoes. The background of the image is a social media profile page with a user name \"YourName\" and a profile picture that match.");
    }

    message.reply(`⚙ Creating your imagination, please be patient...`, async (err, info) => {
      if (err) {
        console.error(err);
        return;
      }
      
      let ui = info.messageID;
      api.setMessageReaction("⏰", event.messageID, () => {}, true);

      try {
        const response = await axios.get(`https://global-sprak.onrender.com/api/sd/v1?prompt=${encodeURIComponent(text)}`);
        
        api.setMessageReaction("✅", event.messageID, () => {}, true);

        const images = response.data.images;
        if (!images || images.length === 0) {
          throw new Error("No images found in the response");
        }

        api.unsendMessage(ui);

        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;

        let imagesInfo = `
🖼 [𝗦𝗗-𝗩1] 
━━━━━━━━━━━━

👑 𝗣𝗿𝗼𝗺𝗽𝘁𝘀: ${text}

🌟 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗜𝗺𝗮𝗴𝗲𝘀: ${images.length}

⚙ 𝗜𝗺𝗮𝗴𝗲𝘀 𝗟𝗶𝗻𝗸𝘀:
${images.map((img, index) => `(${index + 1}) ${img}`).join("\n")}

⏰ 𝗧𝗶𝗺𝗲 𝗧𝗮𝗸𝗲𝗻: ${timeTaken.toFixed(2)} seconds
━━━━━━━━━━━━`;

        message.reply({
          body: imagesInfo,
          attachment: await Promise.all(images.map(img => global.utils.getStreamFromURL(img))) 
        }, async (err) => {
          if (err) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Your cookies are expired.`, event.threadID, event.messageID);
      }
    });
  },
};