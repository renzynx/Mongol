const { MessageEmbed } = require("discord.js")

module.exports = async (text, color, channel) => {
    let embed = new MessageEmbed()
    .setColor(color)
    .setDescription(text)
    await channel.send(embed)
}