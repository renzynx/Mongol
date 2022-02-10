const { Client, Collection, MessageEmbed } = require('discord.js');
const {
  registerEvents,
  registerCommands,
} = require('../struct/registries/Registries.js');
const { Manager } = require('erela.js');
const moment = require('moment');
require('moment-duration-format');
class BotClient extends Client {
  constructor(config) {
    super({
      disableMentions: 'everyone',
    });

    this.token = config.token || process.env.token;

    this.prefix = config.prefix || process.env.prefix;

    this.owners = config.owners;

    this.events = new Collection();

    this.commands = new Collection();

    this.cooldowns = new Collection();

    this.manager = new Manager({
      nodes: [
        {
          host: config.host,
          port: config.port,
          password: config.password,
        },
      ],
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
      .on('nodeConnect', (node) => {
        console.log(`Node "${node.options.identifier}" connected.`);
      })

      .on('nodeError', (node, error) => {
        console.log(
          `Node "${node.options.identifier}" encountered an error: ${error.message}.`
        );
      })
      .on('trackStart', (player, track) => {
        const formattedTime = moment
          .duration(track.duration, 'milliseconds')
          .format('mm:ss');
        const embed = new MessageEmbed()
          .setColor('#2F3136')
          .addField(
            `Now playing :musical_note:`,
            `\`${track.title}\` [[${formattedTime}](${track.uri})]`
          )
          .setFooter(
            `Requested by: ${track.requester.tag}`,
            `${track.requester.displayAvatarURL({ dynamic: true })}`
          );
        const channel = this.channels.cache.get(player.textChannel);
        channel.send(embed);
      })
      .on('queueEnd', (player) => {
        const channel = this.channels.cache.get(player.textChannel);
        channel.send('Queue has ended.');
      });
  }

  start() {
    super.login(this.token);
    registerEvents(this);
    registerCommands(this);
  }
}

module.exports = BotClient;
