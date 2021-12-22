const truewallet = require('../../apis/truewallet');
const { MessageEmbed } = require('discord.js');

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
        let checkwhitelist = await client.get(message.author.tag);

        if(checkwhitelist) {
            let have = new MessageEmbed()
            .setTitle("[ ! ] Check Whitelist")
            .setDescription("คุณมี whitelist แล้ว")
            .setColor("RED")
            message.channel.send({ embeds: [have] });
        } else {
            let success = new MessageEmbed()
            .setDescription("ซื้อ whitelist เรียบร้อยแล้ว")
            .setColor("GREEN")
            message.channel.send({ embeds: [success] });
            client.set(message.author.tag, message.author.id);
        }
      }
    });
  }
}};