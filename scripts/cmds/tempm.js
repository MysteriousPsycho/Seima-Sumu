const axios = require('axios');

module.exports = {
  config: {
    name: "tempmail",
    author: "Mahi--",
    countDown: 5,
    role: 0,
    guide: {
      en: "{pn} tempmail <action> <email>\nActions:\nemail - Fetch emails\n/delete - Delete email\n/generate - Generate a new email\n/inbox - Fetch inbox\n/create - Create email with specific address"
    }
  },

  onStart: async function ({ args, message }) {
    if (args.length === 0) {
      return message.reply('Action required!');
    }

    const action = args[0].toLowerCase();
    const email = args[1] || '';

    try {
      let response;
      switch (action) {
        case 'email':
          response = await axios.get('https://t-mail.vercel.app/api/emails');
          message.reply(`Emails: ${JSON.stringify(response.data)}`);
          break;

        case 'delete':
          if (!email) return message.reply('Email required!');
          response = await axios.delete(`https://t-mail.vercel.app/api/delete_email?email=${email}`);
          message.reply(`Delete response: ${JSON.stringify(response.data)}`);
          break;

        case 'generate':
          response = await axios.get('https://t-mail.vercel.app/api/generate_email');
          message.reply(`Generated Email: ${response.data.email}`);
          break;

        case 'inbox':
          if (!email) return message.reply('Email required!');
          response = await axios.get(`https://t-mail.vercel.app/api/inbox?email=${email}`);
          message.reply(`Inbox: ${JSON.stringify(response.data)}`);
          break;

        case 'create':
          if (!email) return message.reply('Email required!');
          response = await axios.post(`https://t-mail.vercel.app/api/create_email?email=${email}`);
          message.reply(`Create response: ${JSON.stringify(response.data)}`);
          break;

        default:
          message.reply('Invalid action!');
      }
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  },

  // Anti-author change system
  get config() {
    return {
      name: "tempmail",
      author: "Mahi--",
      countDown: 5,
      role: 0,
      guide: {
        en: "{pn} tempmail <action> <email>\nActions:\nemail - Fetch emails\n/delete - Delete email\n/generate - Generate a new email\n/inbox - Fetch inbox\n/create - Create email with specific address"
      }
    };
  }
};