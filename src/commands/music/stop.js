const Command = require('../../struct/Command');

const eb = require('../../utils/base');

class Stop extends Command {
    constructor() {
        super({
            id: 'stop',
            description: 'Stop the current playing music and disconnect from the voice channel',
            inVoiceChannel: true,
            sameVoiceChannel: true,
            isPlaying: true,
            category: 'Music',
            cooldown: 3
        })
    }

    async exec (message) {
        const player = this.client.manager.get(message.guild.id);

        await player.destroy()
        return eb('Stopped the music', 'BLURPLE', message.channel);
    }
}

module.exports = Stop;