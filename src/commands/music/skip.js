const Command = require('../../struct/Command');

const eb = require('../../utils/base');

class SkipCommand extends Command {
  constructor() {
    super({
      id: 'skip',
      description: 'Skip the current playing song.',
      category: 'Music',
      cooldown: 1,
      inVoiceChannel: true,
      sameVoiceChannel: true,
      isPlaying: true,
    });
  }
  async exec(message) {
    const player = this.client.manager.get(message.guild.id);

    eb(
      `Skipped \`${player.queue.current.title}\`.`,
      'BLURPLE',
      message.channel
    );
    return player.stop();
  }
}

module.exports = SkipCommand;
