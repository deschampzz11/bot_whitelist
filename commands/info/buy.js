const truewallet = require('../../apis/truewallet');
const { MessageEmbed } = require('discord.js');
const dbwhitelist = require('../../DB/whitelist.js');
const whitelist = require('../../DB/whitelist.js');

module.exports = {
  name: "buy",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    await message.delete();

dbwhitelist.findOne({ userID: message.author.id }, async (err, user) => {

  if(whitelist) {
    return message.channel.send({ embeds: [new MessageEmbed().setDescription(`[ ! ] <@${message.author.id}> มีไวริสแล้ว`).setColor('RED')] })
  }

  let errurl = new MessageEmbed()
  .setTitle('ไม่พบลิ้งอังเปา')
  .setDescription("```diff\n- กรุณาใส้ลิ้งซองด้วยน้า```")
  .setThumbnail("https://images-ext-1.discordapp.net/external/nCLyCoFKrSceZiXoAnWsnycEYmL3bqD24rWs-7IZPEM/https/i.vgy.me/ss9v5e.gif")
  .setColor('RED')
  
  let errnum = new MessageEmbed()
  .setTitle('เลขอังเปาไม่ถูกต้อง')
  .setDescription(`\`\`\`diff\n- ${message.author.username} กรุณาลองอีกครั้งน้า\`\`\``)
  .setColor('RED')
  let tw_gif = args[0]
  if(!tw_gif){
    message.channel.send({ embeds: [errurl] })
  }
  if(tw_gif){
    
    truewallet.redeemvouchers(client.config.wallet, tw_gif)
    
    .then(async (res) => {
      if(res.amount === null || res.amount === undefined){
        message.channel.send({ embeds: [errnum] })
      }else{
        if(!whitelist) {
            const newwhitelist = new dbwhitelist({
                name: user.user.username,
                userID: user.userID
            });
            newwhitelist.save().catch(err => console.log(err));
            message.channel.send({ embeds: [new MessageEmbed().setDescription(`[ + ] ${message.author.name} ถูกเพิ่มลงในไวริสแล้ว`).setColor('GREEN')] })
        }
      }
    });
  }
});
}};