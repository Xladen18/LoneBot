const Warn = require("../../models/warn.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "warnlevel",
    aliases: ["warnlvl", "wlevel"],
    category: "Moderation",
    description: "Show member's warn level.",
    usage: "WarnLevel <User>",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });

    if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("Sorry, you don't have permissions to use this!");
    }
    if (!args[0]) {
      return message.reply("You need to provide a member to kick!").then(m => m.delete(5000));
    }
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) {
      return message.channel.send("User not found!");
    }

    let warnings = await Warn.find({
      Guild: guildid,
      WarnedUser: {
        ID: wUser.user.id,
      },
    })

    message.reply(`${warnings}`)
  }
}
