const moment = require('moment-timezone');


module.exports.config = {

  name: "autotime",

  version: "2.0.0",

  role: 0,

  author: "Team Calyx",//don't change the author kung ayaw mong ma pwetan!! 

  description: "Automatically sends messages based on set times.",

  category: "AutoTime",

  countDown: 3

};


module.exports.onLoad = async ({ api }) => {

  const arrayData = {

  "12:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 12:00 𝐏𝐌\n\n📌 Verily, after every difficulty, there is relief.” – Quran 94:5.💖"

      },

      "01:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 01:00 𝐀𝐌\n\n📌And among His signs is your sleep by night and by day and your seeking of His bounty, verily in that are signs for those who hearken. – Quran 30.23 😴"

      },

      "02:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 02:00 𝐀𝐌\n\n📌 don't forget to add/follow my owner☺.\n\n📩: https://www.facebook.com/mr.mysterious.868163?mibextid=ZbWKwL"


      },

      "03:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 03:00 𝐀𝐌\n\n📌The silence of the night speaks volumes to those who stand in prayer during Tahajjud.And it's Tahajjut time.🖤✨"


      },

      "04:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 04:00 𝐀𝐌\n\n📌 Get ready for Fajr prayer 🤲"


      },

      "05:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 05:00 𝐀𝐌\n\n📌 🇸🇦La-ilaha-illallah-muhammadur-rasulullah 🇵🇸"


      },

      "06:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 06:00 𝐀𝐌\n\n📌 Good morning everyone!!, Have a nice morning🍞☕🌅"


      },

      "07:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 07:00 𝐀𝐌\n\n📌It's Your Workout: Your Time. Your Body. Own It. 💪"


      },

      "08:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 08:00 𝐀𝐌\n\n📌 Don't forget to eat all breakfast!! 🍞☕🍛"


      },

      "09:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 09:00 𝐀𝐌\n\n 📌 life update: "


      },

      "10:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 10:00 𝐀𝐌\n\n 📌And whoever puts their trust in Allah, then He will suffice him. – Quran 65:3 ❤️✨"


      },

      "11:00:00 AM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 11:00 𝐀𝐌\n\n📌Do not lose hope, nor be sad. – Quran 3:139."


      },

      "12:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 12:00 𝐏𝐌\n\n📌Verily, after every difficulty, there is relief.” – Quran 94:5.💖"


      },

      "01:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 01:00 𝐏𝐌\n\n📌Get ready for Dhuhr prayer 🤲"


      },

      "02:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 02:00 𝐏𝐌\n\n📌 Don't forget to eat y'all launchbreak😸"


      },

      "03:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 03:00 𝐏𝐌\n\n 📌 good afternoon ☺️"


      },

      "04:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 04:00 𝐏𝐌\n\n📌 Get ready for Asr prayer 🤲"


      },

      "05:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 05:00 𝐏𝐌\n\n📌Do not despair of the mercy of Allah. – Quran 39:53. "


      },

      "06:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 06:00 𝐏𝐌\n\n📌Get ready for Maghrib prayer🤲"


      },

      "07:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 07:00 𝐏𝐌\n\n📌Say Astagfirullah 🤍🥀"


      },

      "08:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 08:00 𝐏𝐌\n\n📌Get ready for isha prayer 🤲"


      },

      "09:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 09:00 𝐏𝐌\n\n📌Read Sura Mulk"


      },

      "10:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 10:00 𝐏𝐌\n\n📌don't forget to eat y'all dinner💀🙏"


      },

      "11:00:00 PM": {

        message: "🔔 𝗔𝘂𝘁𝗼 𝗧𝗶𝗺𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 11:00 𝐏𝐌\n\n📌Get ready to go to bed. Have a sweet dream.(Allahumma bismika amutu wa ahya) ☺️ "

      }, 

      "00:05:00": {

      message: "𝚃𝚑𝚒𝚜 𝚒𝚜 𝙰𝚞𝚝𝚘 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚎𝚟𝚎𝚛𝚢 𝟻𝚖𝚒𝚗𝚞𝚝𝚎𝚜:\n\n𝚃𝚑𝚒𝚜 𝚒𝚜 𝚖𝚢 𝚘𝚠𝚗𝚎𝚛/𝚊𝚍𝚖𝚒𝚗 𝚊𝚌𝚌𝚘𝚞𝚗𝚝:https://www.facebook.com/mr.mysterious.868163?mibextid=ZbWKwL"

      }

    // Add more messages for other times as needed

  };


  const checkTimeAndSendMessage = () => {

    const now = moment().tz('Asia/Dhaka');

    const currentTime = now.format('hh:mm:ss A');


    const messageData = arrayData[currentTime];


    if (messageData) {

      const tid = global.db.allThreadData.map(i => i.threadID);

      tid.forEach(async (threadID, index) => {

        api.sendMessage({ body: messageData.message }, threadID);

      });

    }


    const nextMinute = moment().add(1, 'minute').startOf('minute');

    const delay = nextMinute.diff(moment());

    setTimeout(checkTimeAndSendMessage, delay);

  };


  checkTimeAndSendMessage();

};


module.exports.onStart = () => {};

