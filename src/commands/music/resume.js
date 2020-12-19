const Command = require('../../struct/Command');

const eb = require('../../utils/base')

class ResumeCommand extends Command {
    constructor() {
        super({
            id: 'resume',
            description: 'Resume the paused music',
            cooldown: 3,
            category: 'Music',
            inVoiceChannel: true,
            sameVoiceChannel: true,
            isPlaying: true
        })
    }
    async exec (message) {
        const player = this.client.manager.get(message.guild.id)

        if(!player.paused) return eb('The music is already resumed.', '#f5145b', message.channel)
        player.pause(false)

        return eb('Resumed the music!', 'GREEN', message.channel)
    }
}

module.exports = ResumeCommand