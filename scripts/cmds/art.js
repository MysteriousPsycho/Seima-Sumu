const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "art", 
  version: "1.0.0", 
  role: 0,
  author: "𝐌𝐑.𝐀𝐘𝐀𝐍",//**api dipto**//
  description: "𝗣𝗿𝗼𝗺𝗽𝘁 𝘁𝗼 𝗽𝗵𝗼𝘁𝗼, 𝗽𝗵𝗼𝘁𝗼 𝘁𝗼 𝗽𝗵𝗼𝘁𝗼",
  category: "𝗜𝗠𝗔𝗚𝗘", 
  guide: { 
    en:"prompt | reply a photo"
  },
  countDown: 10
};

module.exports.onReply = async function ({ api, event , args}) {
  if (event.type == "message_reply") {
    let mod = args[0] || "1";
    let prompt = args.slice(1).join(" ").toLowerCase() || "anime type";
    const url = event.messageReply.attachments[0].url;
    if (isNaN(url)) {
      try {
        api.setMessageReaction("💋", event.messageID, (err) => {}, true);
        const response = await axios.get(`https://nobs-api.onrender.com/dipto/genix?url=${encodeURIComponent(url)}&prompt=${encodeURIComponent(prompt)}&model=${mod}`);
        const data = response.data.data;
        await api.sendMessage({ 
          body: "✅ | 𝐇𝐀𝐑𝐄 𝐘𝐎𝐔𝐑 𝐀𝐑𝐓 𝐏𝐇𝐎𝐓𝐎", 
          attachment: await global.utils.getStreamFromURL(data)
        }, event.threadID, (error, info) => {
global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: 'reply',
            messageID: info.messageID,
            author: event.senderID,
            link: data
          });
        }, event.messageID);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
    let mod = args[0] || "1";
    let prompt = args.slice(1).join(" ").toLowerCase() || "anime type";
    if (event.type === "message_reply") {
      const url = event.messageReply.attachments[0].url;
const wait = api.sendMessage("𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝐀𝐈𝐓 𝐀𝐑𝐓 𝐋𝐎𝐀𝐃𝐈𝐍𝐆•••", event.threadID);
      try {
        const response = await axios.get(`https://nobs-api.onrender.com/dipto/genix?url=${encodeURIComponent(url)}&prompt=${prompt}&model=${mod}`);
        const link = response.data.data;
        await api.sendMessage({ 
          body: "✅ | 𝐇𝐀𝐑𝐄 𝐘𝐎𝐔𝐑 𝐀𝐑𝐓 𝐏𝐇𝐎𝐓𝐎", 
          attachment: await global.utils.getStreamFromURL(link)
        }, event.threadID, (error, info) => {
global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: 'reply',
            messageID: info.messageID,
            author: event.senderID,
            link: link
          });
        }, event.messageID);
        api.unsendMessage(wait.messageID);
      } catch (e) {
        console.log(e);
      }
    } else if (prompt) {
      const prom = args.join(" ")
      const ratio = prom.split("--ratio")[1].trim() || "1:1"
     // const weight = prom.split("--weight")[1].trim() || 0.8;
      const wait = api.sendMessage("𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝐀𝐈𝐓 𝐀𝐑𝐓 𝐋𝐎𝐀𝐃𝐈𝐍𝐆•••", event.threadID);
      const response = await axios.get(`https://nobs-api.onrender.com/dipto/genix?prompt=${encodeURIComponent(prom)}&ratio=${ratio}`);
      const link = response.data.data;
      const filePath = __dirname + `/cache/genix.png`;
      const respo = await axios.get(link, { responseType: 'stream' });
      const writer = fs.createWriteStream(filePath);
      respo.data.pipe(writer);
      writer.on('finish', async () => {
        await api.sendMessage({ 
          body: "✅ | 𝐇𝐀𝐑𝐄 𝐘𝐎𝐔𝐑 𝐀𝐑𝐓 𝐏𝐇𝐎𝐓𝐎", 
          attachment: fs.createReadStream(filePath)
        }, event.threadID, (error, info) => {
global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: 'reply',
            messageID: info.messageID,
            author: event.senderID,
            link: link
          });
        }, event.messageID);
        api.unsendMessage(wait.messageID);
        fs.unlinkSync(filePath);
      });
    }
  } catch (error) {
    console.error(`Failed to generate: ${error}`);
    api.sendMessage(`⚠️ | END: ${error.message}`, event.threadID, event.messageID);
  }
};