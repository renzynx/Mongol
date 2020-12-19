const Command = require('../../struct/Command.js');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

class HelpCommand extends Command {
  constructor() {
    super({
      id: 'help',
      aliases: ['h'],
      description: 'Get all the available commands',
      usage: 'help [command]',
      example: ['help ping'],
      cooldown: 3,
    });
  }

  exec(message, args) {
    const embed = new MessageEmbed()
    .setColor('RANDOM');

    const command = this.client.commands.get(args[0]);
    
    if (command) {
      embed.setDescription(stripIndents(`
        **Name:** ${command.id}
        **Usage:** ${command.usage ? command.usage : 'None'}
        **Aliases:** ${command.aliases.length ? command.aliases.join(', ') : 'None'}
        **Description:** ${command.description || 'No description provided.'}
        **Example:** ${command.example.length ? command.example.join('\n') : 'None'}
      `));
      embed.setFooter(`Command parameters in <> is required, [] is optional.`)
    }
    else {
      const categories = this.removeDuplicates(this.client.commands.map(c => c.category));
      embed.setDescription(`For additional info on a command, use \`${this.client.prefix}help <command>\``);
      for (const category of categories) {
        const categoryID = category || 'Utility';
        embed.addField(categoryID, this.client.commands.filter(c => c.category === category).map(c => '`' + c.id + '`').join(' '));
      }
    }
    message.channel.send(embed);
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }
}

module.exports = HelpCommand;