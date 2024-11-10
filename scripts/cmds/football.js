module.exports.config = {
    name: "football",
    version: "1.0.0",
    role: 0,
    author: "Romim",
    category: "Random"
  }
  module.exports.onStart = async  ({api,event}) => {
    try {
      
    const axios = require("axios")
    const res = await axios.get("https://a6-video-api-t0il.onrender.com/video/football")
    const data = res.data
    const dat = data.data
    const count = data.count
  const a6 = (await axios.get(dat,{responseType: 'stream'})).data
      api.sendMessage({body:"𝙷𝙴𝚈 𝙱𝙱𝙴 𝚈𝙾𝚄𝚁 𝙵𝙾𝙾𝚃𝙱𝙰𝙻𝙻 𝚅𝙸𝙳𝙴𝙾",attachment:a6},event.threadID,event.messageID)
    } catch (error) {
      api.sendMessage(`error:${error.message}`,event.threadID,event.messageID)
    }
    }