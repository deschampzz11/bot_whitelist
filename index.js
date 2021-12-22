const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
  ws: {
    properties: {
        $browser: "Discord iOS" 
    },
  },
});

module.exports = client;

client.config = require('./config.json')
client.prefix = client.config.prefix
client.commands = new Collection();
client.slashCommands = new Collection();

require("./handler")(client);
require("./dblogin")(client);

client.login(client.config.token);