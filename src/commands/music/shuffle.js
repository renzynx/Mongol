const Command = require('../../struct/Command');

module.exports = class ShuffleQueue extends Command {
  constructor() {
    super({
      id: 'shuffle',
      description: 'Shuffle the current queue',
      aliases: ['random'],
      usage: 'shuffle',
      example: ['shuffle'],
      cooldown: 3,
      category: 'Music',
      clientPermissions: ['CONNECT', 'SPEAK'],
      inVoiceChannel: true,
      requiredArgs: false,
    });
  }
  async exec(message) {
    const player = this.client.manager.players.get(message.guild.id);

    const channel = message.member.voice.channel;

    const bot = message.guild.me.voice.channel;

    if (!channel)
      return message.channel.send(
        '> You need to be in a voice channel to use this command.'
      );

    if (channel.id !== bot.id)
      return message.channel.send(
        '> You are not in the same voice channel as mine to use this command.'
      );

    if (!player)
      return message.channel.send('> There is no music playing in the guild.');

    player.queue.shuffle();
    return message.channel.send('> Shuffled the queue.');
  }
};
