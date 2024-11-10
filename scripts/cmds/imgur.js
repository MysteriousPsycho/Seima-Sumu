const axios = require('axios');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
		config: {
				name: "imgur",
				version: "1.0.0",
				role: 0,
				author: "cliff",
				shortDescription: "imgur upload",
				countDown: 0,
				category: "imgur",
				guide: {
						en: '[reply to image]'
				}
		},

		onStart: async ({ api, event }) => {
				let link2;

				if (event.type === "message_reply" && event.messageReply.attachments.length > 0) {
						link2 = event.messageReply.attachments[0].url;
				} else if (event.attachments.length > 0) {
						link2 = event.attachments[0].url;
				} else {
						return api.sendMessage('No attachment detected. Please reply to an image.', event.threadID, event.messageID);
				}

				try {
						const res = await axios.get(`http://158.101.198.227:8609/imgur2?link=${encodeURIComponent(link2)}`);
						const link = res.data.uploaded.image;
						return api.sendMessage(`𝙷𝙴𝙻𝙻𝙾 𝚃𝙷𝙸𝚂 𝙸𝚂 𝚂𝙴𝙸𝙼𝙰 𝚂𝚄𝙼𝚄 𝚈𝙾𝚄𝚁 𝙸𝙼𝙶𝚄𝚁 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈 :\n\n${link}`, event.threadID, event.messageID);
				} catch (error) {
						console.error("Error uploading image to Imgur:", error);
						return api.sendMessage("An error occurred while uploading the image to Imgur.", event.threadID, event.messageID);
				}
		}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });