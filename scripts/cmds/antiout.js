module.exports = {
 config: {
 name: "antiout",
 author: "UPoL🤧",
 role: 2,
 shortDescription: "Murgi cannot leave the group.",
 guide: {
 			en: "{pn} { on | off }",
		},
 envConfig: {
 deltaNext: 5
 }
 },
 onStart: async function({ message, event, threadsData, args }) {
 let antiout = await threadsData.get(event.threadID, "settings.antiout");
 if (antiout === undefined) {
 await threadsData.set(event.threadID, true, "settings.antiout");
 antiout = true;
 }
 if (!["on", "off"].includes(args[0])) {
 return message.reply("🐔 Please use 'on' or 'off'");
 }
 await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
 return message.reply(` ✅ Antiout has been ${args[0] === "on" ? "enabled" : "disabled"}.`);
 },
 onEvent: async function({ api, event, threadsData }) {
 const antiout = await threadsData.get(event.threadID, "settings.antiout");
 if (antiout && event.logMessageData && event.logMessageData.leftParticipantFbId) {
 
 const userId = event.logMessageData.leftParticipantFbId;

 const threadInfo = await api.getThreadInfo(event.threadID);
 const userIndex = threadInfo.participantIDs.indexOf(userId);

 if (userIndex === -1) {
 const addUser = await api.addUserToGroup(userId, event.threadID);

 if (addUser) {
 console.log(`😼 Yeehh, i added the gæ/lesbo person.`);
 } else {
 console.log(`😞 Sorry i cant re-add the bitch.`);
 }
 }
 }
 }
};