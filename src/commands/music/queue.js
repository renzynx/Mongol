const Command = require('../../struct/Command');

const { MessageEmbed } = require('discord.js');

const moment = require('moment')
require('moment-duration-format');

class Queue extends Command {
    constructor() {
        super({
            id: 'queue',
            aliases: ['q'],
            description: 'Show the music queue for current guild.',
            usage: 'queue [page]',
            example: ['queue 2'],
            category: 'Music',
            cooldown: 3,
        })
    }

    async exec (message, args) {
        const player = this.client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no music in the queue.");

        const queue = player.queue;
        const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setAuthor(`Queue for ${message.guild.name}`);

        // change for the amount of tracks per page
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        if (queue.current) embed.addField("Currently playing", `[${queue.current.title}](${queue.current.uri}) [${moment.duration(queue.current.duration, 'millisecond').format("hh:mm:ss")}]`);

        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `**${start + (++i)}.** - [${track.title}](${track.uri}) [${moment.duration(track.duration, 'milliseconds').format("hh:mm:ss")}]`).join("\n"));

        const maxPages = Math.ceil(queue.length / multiple);

        embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

        return message.reply(embed);
    }
}

module.exports = Queue;