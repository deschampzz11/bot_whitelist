const { MessageEmbed } = require('discord.js');
const dbwhitelist = require('../../DB/whitelist.js');


module.exports = {
    name: "whitelist",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!client.config.ownerID.includes(message.author.id)){return msgerr(`**[ X ]**  ท่านไม่มีสิทธิ์ใช้คำสั่งนี้`)}
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return msgerr('กรุณาระบุผู้ใช้ที่ต้องการเพิ่มไวลิส');
        
        dbwhitelist.findOne({userid: user.id}, (err, whitelist) => {
            if(err) console.log(err);
            if(!whitelist) {
                const newwhitelist = new dbwhitelist({
                    name: user.user.username,
                    userid: user.id
                });
                newwhitelist.save().catch(err => console.log(err));
                sucEmbed(`[ + ] ${user} ถูกเพิ่มลงในไวลิสแล้ว`);
            } else {
                msgerr(`[ ! ] ${user} มีไวลิสแล้ว`);
            }
        }
        );

        function sucEmbed(content) {
            var sucEmbed = new MessageEmbed()
            .setColor('#00ff00')
            .setDescription(content)
            message.channel.send({ embeds: [sucEmbed] });
        }
        function msgerr(content) {
            var msgerr = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(content)
            message.channel.send({ embeds: [msgerr] });
        }
    }}