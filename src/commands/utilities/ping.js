const Command = require('../../struct/Command.js');

const { MessageEmbed } = require('discord.js');

class PingCommand extends Command {
  constructor() {
    super({
      id: 'ping',
      description: 'Get the websocket and bot ping',
      cooldown: 3,
    });
  }

  async exec(message) {
    const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;

    const m = new MessageEmbed()
      .setTitle(':ping_pong: Pong')
      .addField('Bot Latency', `\`${latency}ms\``, true)
      .addField('API Latency', `\`${this.client.ws.ping}ms\``, true)
      .setColor('RANDOM')
      .setTimestamp();
    return message.channel.send(m);
  }
}

module.exports = PingCommand;
