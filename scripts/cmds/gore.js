const axios = require('axios');
const { getStreamFromURL } = global.utils;
 
module.exports = {
    config: {
        name: "gore",
        version: "1.0",
        author: "Samir Œ",
        countDown: 5,
        role: 2,
        shortDescription: "Fetch and send a gore video",
        longDescription: "Fetches a gore video ",
        category: "utility",
        guide: {
            vi: "Sử dụng lệnh như sau:\ngore",
            en: "Use the command as follows:\ngore"
        }
    },
    onStart: async function ({ api, message, event }) {
        try {
            const response = await axios.get('https://samirxpikachuio.onrender.com/gore');
            const { title, video1 } = response.data;
 
            const videoStream = await getStreamFromURL(video1);
 
            await message.reply({
                body: title,
                attachment: videoStream
            });
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while fetching the video. Please try again.");
        }
    }
};