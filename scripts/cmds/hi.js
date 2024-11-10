module.exports = {
 config: {
   name: "hi",
   version: "1.0",
   author: "MR.AYAN",
   countDown: 5,
   role: 0,
   shortDescription: "no prefix",
   longDescription: "no prefix",
   category: "no prefix",
 },
  
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "hi") {
 return message.reply({
 body: "Hi na bole salam din ete sowab hobe. Assalamuwalaikum 😊🥀",
 });
 }
 }
}