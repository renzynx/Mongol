const Command = require('../../struct/Command.js')

module.exports = class LyricCommand extends Command {
  constructor() {
    super({
      id: 'lyric',
      aliases: ['ly'],
      description: 'Get a song lyric',
    })
  }

  exec(message, args) {
    const song = args.join(' ')

    if (!song.length) return message.channel.send("No song was provided")

    const cleaned = song.split(' ').join('%20')

    return message.channel.send(`Here is what i found: https://lyricfinder.xyz/results/${cleaned}`)
  }
}
