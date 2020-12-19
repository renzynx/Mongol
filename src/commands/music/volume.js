const Command = require('../../struct/Command');

const eb = require('../../utils/base');

class Volume extends Command {
    constructor() {
        super({
            id: 'volume',
            description: 'Change the current playing music volume.',
            usage: 'volume <number>',
            example: ['volume 69'],
            cooldown: 3,
            category: 'Music',
            inVoiceChannel: true,
            sameVoiceChannel: true,
            isPlaying: true
        })
    }

    async exec (message, args) {
        const player = this.client.manager.get(message.guild.id)
        const index = args[0]
        if (isNaN(index)) return eb('The volume needs to be a number.', 'RED', message.channel);

        if (index < 0 || index > 200) return eb('The volume can only be < 0 or > 200', 'RED', message.channel);

        player.setVolume(index)

        return eb(`Set the music volume to: \`${index}%\``, 'BLURPLE', message.channel);
    }
}

module.exports = Volume;