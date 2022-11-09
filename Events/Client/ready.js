const { Client, GatewayIntentBits, ActivityType } = require('discord.js');//ArviS#0011
const mongoose = require('mongoose');
const config = require("../../config.json");
//ArviS#0011
module.exports = {
    name: "ready",//ArviS#0011
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {//ArviS#0011
            keepAlive: true,
        });//ArviS#0011
//ArviS#0011
        if (mongoose.connect) {
            console.log('MongoDB Bağlantusu Başarılı')
        }//ArviS#0011
//ArviS#0011
        client.user.setPresence({//ArviS#0011
            activities: [{ name: `Logocum Grafik`, type: ActivityType.Competing }],//ArviS#0011
            status: 'online',//ArviS#0011
          });
//ArviS#0011
        console.log(`BOT AKTİF: ${client.user.username}`);//ArviS#0011
    },//ArviS#0011
};//ArviS#0011
//ArviS#0011








//ArviS#0011