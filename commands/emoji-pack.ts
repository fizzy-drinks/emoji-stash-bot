import axios from 'axios'
import { MessageAttachment } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import JSZip from 'jszip'

export default class EmojiPackCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'pack',
      group: 'emoji',
      memberName: 'pack',
      description: 'Get a zipped pack of all current guild emojis'
    })
  }

  async run (message: CommandoMessage, { emoji }: { emoji: string }) {
    await message.say('Downloading emoji...')
    const emojiDownloads = await Promise.all(message.guild.emojis.cache.map(async ({ url, name }) => ({
      data: (await axios.get(url, { responseType: 'stream' })).data,
      name,
      ext: url.replace(/.*(\.[a-zA-Z0-9]+)$/, '$1')
    })))

    const zip = new JSZip()
    emojiDownloads.forEach(({ data, name, ext }) => {
      zip.file(name + ext, data, { binary: true })
    })

    const zipFile = await zip.generateAsync({ type: 'nodebuffer' })
    message.channel.send(new MessageAttachment(zipFile, 'emoji.zip'))

    return message
  }
}
