const dbpoint = require('../../DB/point.js');

module.exports = {
  name: "addpoint",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      dbpoint.findOne({ userid: message.author.id }, (err, point) => {
          const newpoint = new dbpoint({
                name: message.author.username,
                userid: message.author.id,
                point: point.point + args[0]
            });
            newpoint.save();
        });
  }}