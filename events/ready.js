const client = require("../index.js");

client.on("ready", () => {
    console.log('==============================')
    console.log(`${client.user.tag} ออนไลน์แล้ว!`),
    console.log('==============================')
    client.user.setActivity(`Hmm`, {type: 'PLAYING'})
});