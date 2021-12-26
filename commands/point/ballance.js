const dbpoint = require('../../DB/point.js');
const MessageEmbed = require('discord.js')

module.exports = {
  name: "bal",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      dbpoint.findOne({ userid: message.author.id }, (err, point) => {
          if(!point) return message.channel.send(`${message.author.username} คุณไม่มีเงิน`);
          const bal = new MessageEmbed()
                .setDescription(`${message.author.username} มีคะแนนคือ \`${point.point}\` บาท`)
                .setColor('GREEN')
            message.channel.send({ embeds: [bal] });
        });

  }}