const Command = require('../../struct/Command');

const { MessageEmbed } = require('discord.js');

class Search extends Command {
  constructor() {
    super({
      id: 'search',
      aliases: ['sr'],
      description: 'Search music on youtube to play',
      usage: 'search <song name>',
      example: ['search never gonna give you up'],
      cooldown: 3,
      category: 'Music',
      inVoiceChannel: true,
    });
  }
  async exec(message, args) {
    const query = args.join(' ');

    const player =
      this.client.manager.get(message.guild.id) ||
      this.client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 80,
      });

    const results = await this.client.manager.search(query, message.author);

    const t = results.tracks
      .slice(0, 10)
      .map((track, index) => `**${++index}** - ${track.title}`)
      .join('\n\n');

    const embed = new MessageEmbed()
      .setTitle(`Search results for ${query}`)
      .setColor('RANDOM')
      .setDescription(t)
      .setFooter(
        `Requested by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel.send(embed);
    message.channel.send('Type between **1** and **10** to choose a song.');

    let collected, filter;

    try {
      filter = (m) =>
        m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
      collected = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30e3,
        errors: ['time'],
      });
    } catch (e) {
      if (!player.queue.current) player.destroy();
      return message.reply("You didn't select a song in time.");
    }

    const first = collected.first().content;

    if (first.toLowerCase() === 'end') {
      if (!player.queue.current) player.destroy();
      return message.channel.send('Cancelled selection.');
    }

    const index = Number(first) - 1;
    if (index < 0 || index > 10 - 1)
      return message.reply(`You can only choose between **1** to **10**.`);

    const track = results.tracks[index];
    if (player.state !== 'CONNECTED') await player.connect();
    player.queue.add(track);

    if (!player.playing && !player.paused && !player.queue.size) {
      player.play();
    } else {
      const ms = new MessageEmbed()
        .setColor('RANDOM')
        .setColor(message.guild.me.displayHexColor || '#2F3136')
        .setFooter(
          `Requested by: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField('Enqueued', `\`${track.title}\``);
      return message.channel.send(ms);
    }
  }
}

module.exports = Search;
