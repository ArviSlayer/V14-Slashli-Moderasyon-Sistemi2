const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');//ArviS#0011
//ArviS#0011
const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;//ArviS#0011
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;
//ArviS#0011
const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');//ArviS#0011

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],//ArviS#0011
    partials: [User, Message, GuildMember, ThreadMember],
});
//ArviS#0011
client.commands = new Collection();
client.config = require('./config.json');

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});










//ArviS#0011