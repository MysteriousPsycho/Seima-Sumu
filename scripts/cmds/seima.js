module.exports = {
    config: {
        name: "💀 mdrcd",
        version: "1.0",
        author: "UPoL 🐔",
        countDown: 5,
        role: 0,
        shortDescription: "ignore this command",
        category: "no prefix",
    },
    onStart: async function () {},
    onChat: async function ({ event, message, getLang, api }) {
        if (event.body && event.body.toLowerCase() === 'seima') {
            if (event.senderID === '100075534081233') {
                api.setMessageReaction("🖤", event.messageID, event.messageID, api);
                return message.reply(`jih`);
            } else {
      return message.reply(`আমার জান আসাদ কে ছাড়া আমি কারোর ম্যাসেজের রিপ্লাই দিবো না।🥱`);
          }
        }
    }
};