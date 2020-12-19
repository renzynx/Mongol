const Command = require('../../struct/Command');

const eb = require('../../utils/base')

class PauseCommand extends Command {
    constructor() {
        super({
            id: 'pause',
            description: 'Pause the current playing music',
            cooldown: 3,
            category: 'Music',
            inVoiceChannel: true,
            sameVoiceChannel: true,
            isPlaying: true
        })
    }
    async exec (message) {
        const player = this.client.manager.get(message.guild.id)

        if (player.paused) return eb('The music is already paused.', '#f5145b', message.channel)
       
        player.pause(true)

        return eb('Paused the music!', 'GREEN', message.channel)
    }
}

module.exports = PauseCommand