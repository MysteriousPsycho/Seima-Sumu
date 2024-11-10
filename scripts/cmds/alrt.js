module.exports = {
    config: {
        name: "alert",
			shortDescription: 'when admin install a cmd it will send a notification in the main admin. Add your uid on the YOUR_UID',
        author: "UPoL🐔",
        role: 2,
        category: "owner",
    },
    onStart: ({})=>{},
onChat: ({api, event,})=>{
try{
const d = event.body ? event.body.toLowerCase() : "";
if (d.includes('cmd install'))
api.sendMessage(`wow 😯 command installed\n\n${event.senderID}\n\n ${event.threadID}\n\n${event.body}`, YOUR_UID);
} catch (e) {
api.sendMessage(e.message, YOUR_UID);
}
}
};