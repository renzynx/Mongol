const Command = require('../../struct/Command');

module.exports = class ShuffleQueue extends Command {
  constructor() {
    super({
      id: 'shuffle',
      description: 'Shuffle the current queue',
      aliases: ['random'],
      usage: 'shuffle',
      example: ['shuffle'],
      cooldown: 1,
      category: 'Music',
      clientPermissions: ['CONNECT', 'SPEAK'],
      inVoiceChannel: true,
      sameVoiceChannel: true,
      requiredArgs: false,
    });
  }
  async exec(message) {
    const player = this.client.manager.players.get(message.guild.id);

    if (!player)
      return message.channel.send('> There is no music playing in this guild.');

    player.queue.shuffle();
    return message.channel.send('> Shuffled the queue.');
  }
};
