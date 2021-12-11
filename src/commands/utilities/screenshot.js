const Command = require('../../struct/Command')
const puppy = require('puppeteer')
const { MessageAttachment } = require('discord.js')

module.exports = class ScreenShot extends Command {
  constructor() {
    super({
      id: 'screenshot',
      aliases: ['ss'],
      description: 'This command let you screenshot a website',
      usage: 'sreenshot <url>',
      example: ['screenshot https://google.com'],
      cooldown: 1,
    })
  }

  async exec(message, args) {
    const url = args[0]

    if (!url) return message.channel.send("No url was provided")

    const browser = await puppy.launch()

    const page = await browser.newPage()

    await page.goto(url)

    const image = await page.screenshot()

    await browser.close()

    const attachment = new MessageAttachment(image)

    return message.channel.send(attachment)
  }
}
