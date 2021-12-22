const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const dbwhitelist = require('../../DB/whitelist.js');


module.exports = {
    name: "script",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        dbwhitelist.findOne({userid: message.author.id}, async (err, whitelist) => {
            if(!whitelist) {
                msgerr(`**[ ! ]**  ท่านไม่มีไวริสกรุณาสั่งซื้อไวริสก่อนนะครับ :)`);
            } else {
                const eb = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`กรุณาเลือกสคริปต์ที่ต้องการ`)

                const success = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`ผมส่งไปในแชทส่วนตัวแล้วครับ`)

                const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('script')
                    .setPlaceholder('กรุณาเลือกสคริปต์ของคุณ')
                    .setOptions([
                        {
                            label: 'Blox Fruit',
                            value: 'bloxfruit',
                            emoji: '<:BF:923198898070249502>'
                        }
                    ])
                )
                var msg = await message.channel.send({ embeds: [eb], components: [row] });
                const filter = (x) => x.user.id === message.author.id;
                const collector = msg.createMessageComponentCollector({ filter, time: 300000});
            
                collector.on('collect', async x => {
                    x.deferUpdate()
                    if(x.values[0] === 'bloxfruit') {
                        const bloxfruit = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Blox Fruit')
                        .setDescription(`\`\`\`lua\nloadstring(game:HttpGet("https://MISEHUB.lua")\`\`\``)
                        eb.setDescription(`ผมส่งไปในแชทส่วนตัวแล้วครับ`);
                        msg.edit({ embeds: [success], components: [] });
                        message.author.send({ embeds: [bloxfruit] });
                    }
            })
            }
        }
        );

        function msgerr(content) {
            var msgerr = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(content)
            message.channel.send({ embeds: [msgerr] });
        }

    }}