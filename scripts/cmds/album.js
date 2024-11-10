const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "album",
    aliases: [],
    version: "2.1",
    author: "ArYAN",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "Lấy một video ngẫu nhiên từ thể loại đã chỉ định.",
      en: "Get a random video from the specified category."
    },
    longDescription: {
      vi: "Lệnh này cho phép bạn lấy một video ngẫu nhiên từ các thể loại khác nhau như Anime, Lofi, và nhiều thể loại khác nữa. Bạn có thể xem hoặc stream video trực tiếp từ những thể loại này.",
      en: "This command allows you to fetch a random video from different categories such as Anime, Lofi, and more. You can view or stream videos directly from these categories."
    },
    category: "album",
    guide: {
      en: "{pn} <category>\n- Fetch a random video from the specified category."
    }
  },
  onStart: async ({ api, event, args }) => {
    if (!args[0]) {
      const message = "👑| 𝗔𝗟𝗕𝗨𝗠𝗦\n━━━━━━━━━━━\n\n1 - Anime Videos\n2 - Lofi Videos\nMore albums coming soon.\n\nPlease reply with valid album category.";
      api.sendMessage(message, event.threadID, (error, info) => {
        if (error) return console.error(error);
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
        });
      });
    } else {
      const command = args.shift().toLowerCase();
      const category = getCategoryName(command);

      if (!category) {
        api.sendMessage(`⚙️ Invalid category. Please enter a valid album category.`, event.threadID);
        return;
      }

      if (command === "stream") {
        api.sendMessage(`👑| Streaming video from category ${category}, please wait......`, event.threadID);
        streamVideo(api, event.threadID, category);
      } else {
        api.sendMessage(`Fetching video from category: ${category}`, event.threadID);
        fetchVideo(api, event.threadID, category);
      }
    }
  },
  onReply: async ({ api, event, Reply }) => {
    if (event.type === "message_reply" && Reply.author === event.senderID) {
      const category = getCategoryName(event.body);

      if (!category) {
        api.sendMessage(`❌| Invalid category. Please enter a valid album category.`, event.threadID);
        return;
      }

      api.sendMessage(`⚙️ Fetching video from category: ${category}, please wait....`, event.threadID);
      fetchVideo(api, event.threadID, category);
    }
  }
};

function getCategoryName(command) {
  switch (command) {
    case "1":
      return "anime";
    case "2":
      return "lofi";
    // Add more cases for other categories as needed
    default:
      return null; // Return null for unrecognized categories
  }
}

async function fetchVideo(api, threadID, category) {
  try {
    const response = await axios.get(`https://fe79fefc-56db-4e79-845a-623dfc619745-00-hg2l3xvcfoq0.pike.replit.dev/album?category=${encodeURIComponent(category.toLowerCase())}`);
    const video = response.data;
    const videoBuffer = await axios.get(video.url, { responseType: 'arraybuffer' });
    const filename = `${category}_${Date.now()}.mp4`;
    fs.writeFileSync(filename, videoBuffer.data);
    api.sendMessage({
      body: `👑|𝗔𝗟𝗕𝗨𝗠\n━━━━━━━━━━━\n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title}\n⚙️ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${category}`,
      attachment: fs.createReadStream(filename)
    }, threadID, () => fs.unlinkSync(filename)); // Delete file after sending
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      api.sendMessage(`The category "${category}" could not be found. Please check the available categories.`, threadID);
    } else {
      api.sendMessage(`An error occurred while fetching the video: ${error.message}`, threadID);
    }
  }
}

async function streamVideo(api, threadID, category) {
  try {
    const response = await axios.get(`https://fe79fefc-56db-4e79-845a-623dfc619745-00-hg2l3xvcfoq0.pike.replit.dev/album?category=${encodeURIComponent(category.toLowerCase())}`);
    const video = response.data;
    const videoBuffer = await axios.get(video.url, { responseType: 'arraybuffer' });
    const filename = `${category}_${Date.now()}.mp4`;
    fs.writeFileSync(filename, videoBuffer.data);
    api.sendMessage({
      body: `👑|𝗔𝗟𝗕𝗨𝗠\n━━━━━━━━━━━\n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title}\n⚙️ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${category}`,
      attachment: fs.createReadStream(filename)
    }, threadID, () => fs.unlinkSync(filename)); // Delete file after sending
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      api.sendMessage(`The category "${category}" could not be found. Please check the available categories.`, threadID);
    } else {
      api.sendMessage(`An error occurred while streaming the video: ${error.message}`, threadID);
    }
  }
}