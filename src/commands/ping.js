const Command = require('../struct/Command.js');

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
    const msg = await message.channel.send('Pinging...')

    const msgP = Date.now() - msg.createdTimestamp;

    const m = new MessageEmbed()
    .setTitle(':ping_pong: Pong')
    .addField('Websocket', `\`${this.client.ws.ping}ms\``, true)
    .addField('Message delay', `\`${msgP}ms\``, true)
    .setColor('RANDOM')
    .setTimestamp()
    return message.channel.send(m)
  }
}

module.exports = PingCommand;