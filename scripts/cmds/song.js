const axios = require("axios");
const fs = require('fs');

module.exports = {
    config: {
        name: "song",
        version: "2.5",
        author: "UPoL🐔",
        countDown: 15,
        role: 0,
        category: "media",
        guide: {
            en: "{pn} <song_name>"
        }
    },
    onStart: async ({ api, args, event, message }) => {
        const songName = args.join(" ");
        if (!songName) {
            return api.sendMessage("❌ Please provide a song name.", event.threadID, event.messageID);
        }
        await api.sendMessage("Searching........", event.threadID, event.messageID);

        // Corrected parameter name
        const apiUrl = `https://upol-yt-music-mp3.onrender.com/ytdl/music?name=${encodeURIComponent(songName)}`;

        try {
            const { data } = await axios.get(apiUrl);

            if (data.error) {
                return api.sendMessage(`❌ Error: ${data.error}`, event.threadID, event.messageID);
            }

            const { title, downloadLink } = data;

            if (!downloadLink) {
                return api.sendMessage("❌ Could not find a valid download link.", event.threadID, event.messageID);
            }

            const filePath = 'music.mp3';
            await downloadFile(downloadLink, filePath);

            api.sendMessage({
                body: `🎵 Now playing: ${title}`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
                fs.unlinkSync(filePath);
            }, event.messageID);

        } catch (error) {
            console.error("Error fetching song:", error.message);
            api.sendMessage("❌ An error occurred while trying to fetch the song. Please try again later.", event.threadID, event.messageID);
        }
    }
};

async function downloadFile(url, path) {
    const response = await axios.get(url, { responseType: 'stream' });
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(path);
        response.data.pipe(fileStream);
        fileStream.on('finish', resolve);
        fileStream.on('error', (error) => {
            console.error("Error writing file:", error.message);
            reject(error);
        });
    });
}