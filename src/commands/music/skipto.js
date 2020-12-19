const Command = require('../../struct/Command');

const eb = require('../../utils/base');

class SkipTo extends Command {
    constructor() {
        super({
            id: 'skipto',
            description: 'Skip to a certain song position in queue.',
            usage: 'skipto <number>',
            example: ['skipto 4'],
            inVoiceChannel: true,
            sameVoiceChannel: true,
            isPlaying: true,
            category: 'Music',
            cooldown: 2
        })
    }
    async exec (message) {
        const index = args[0];
        if (!index) return eb('You need to provide a number to skip to.', 'RED', message.channel)
        if(isNaN(index)) return eb('Invalid number.', 'BLURPLE', message.channel)

        const player = this.client.mananger.get(message.guild.id);

        player.stop(index)
    }
}

module.exports = SkipTo;