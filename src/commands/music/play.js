const Command = require('../../struct/Command');

const { MessageEmbed } = require('discord.js');

const moment = require('moment');
require('moment-duration-format');
class PlayCommand extends Command {
  constructor() {
    super({
      id: 'play',
      description: 'Play music from youtube and soundcloud',
      aliases: ['p'],
      usage: 'play <song name>',
      example: ['play never gonna give you up'],
      cooldown: 1,
      category: 'Music',
      clientPermissions: ['CONNECT', 'SPEAK'],
      inVoiceChannel: true,
      requiredArgs: true,
    });
  }
  async exec(message, args) {
    const query = args.join(' ');
    if (!query)
      return message.channel.send(
        'You need to provide a song name or links to play!'
      );

    const res = await this.client.manager.search(query, message.author);

    const player = this.client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
      volume: 80,
    });

    switch (res.loadType) {
      case 'LOAD_FAILED':
        throw res.exception;
      case 'CONNECTED':
        await player.connect();
        break;
      case 'PLAYLIST_LOADED':
        await player.queue.add(res.tracks);
        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();

        const rn = new MessageEmbed()
          .setColor(message.guild.me.displayHexColor || '#2F3136')
          .setAuthor(
            'Playlist added to the queue',
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle(`**🎶 ${res.playlist.name}**`)
          .addField('Enqueued', '`' + res.tracks.length + '` songs')
          .addField(
            'Duration',
            moment
              .duration(res.playlist.duration, 'milliseconds')
              .format('hh:mm:ss')
          )

          .setTimestamp();

        message.channel.send(rn);
        break;
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        break;
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.size)
          player.play();
        else {
          const rb = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor || '#2F3136')
            .setFooter(
              `Requested by: ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField('Enqueued', `\`${res.tracks[0].title}\``);
          return message.channel.send(rb);
        }
        break;
    }
  }
}

module.exports = PlayCommand;
