module.exports = {
    config: {
        name: "sumu",
        version: "1.0",
        author: "Mysterious_Asad",
        countDown: 5,
        role: 0,
        shortDescription: "ignore this command",
        category: "no prefix",
    },
    onStart: async function () {},
    onChat: async function ({ event, message, getLang, api }) {
        if (event.body && event.body.toLowerCase() === 'sumu') {
            if (event.senderID === '100075534081233') {
                api.setMessageReaction("🖤", event.messageID, event.messageID, api);
                return message.reply(`হ্যা বলো 😗`);
            } else {
      return message.reply(`জ্বি 🦥`);
          }
        }
    }
};
