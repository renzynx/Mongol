const Command = require('../../struct/Command.js');
const axios = require('axios').default;

class LyricFinder extends Command {
  constructor() {
    super({
      id: 'lyric',
      aliases: ['lyrics'],
      description: 'Get lyric for a song',
      example: ['lyric save your tears'],
      cooldown: 3,
      category: 'Music',
    });
  }

  async exec(message, args) {
    const songName = args.join(' ');
    const player = this.client.manager.players.get(message.guild.id);
    const current = player ? player.queue.current : false;

    if (player && current && !songName.length) {
      const { title } = current;

      const res = await axios
        .get(`https://lyricfinder.xyz/api/lyric?title=${title}&artist=" "}`)
        .catch((err) => {
          return message.channel.send("I can't find any lyric for this song ");
        });

      const data = res.data;

      if (!data) return;

      const p1 = data.lyrics.slice(0, 1900);
      const p2 = data.lyrics.slice(1900, data.lyrics.length);

      message.channel.send(`**Lyric for "${title}"**`);
      [p1, p2].map((item) => {
        return message.channel.send(`\`\`\`${item}\`\`\``);
      });

      return null;
    }

    if (!songName.length)
      return message.channel.send('You need to give me a song name to search.');

    const searchRes = await axios
      .get(`https://lyricfinder.xyz/api/lyric?title=${songName}&artist=" "}`)
      .catch((err) => {
        return message.channel.send("I can't find any lyric for this song.");
      });

    const searchData = searchRes.data;

    if (!searchData) return;

    const sp1 = searchData.lyrics.slice(0, 1900);
    const sp2 = searchData.lyrics.slice(1900, searchData.lyrics.length);

    message.channel.send(`**Lyric for "${songName}"**`);
    [sp1, sp2].map((item) => {
      return message.channel.send(`\`\`\`${item}\`\`\``);
    });
    return;
  }
}

module.exports = LyricFinder;
