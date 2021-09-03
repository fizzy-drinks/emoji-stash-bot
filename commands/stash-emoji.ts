import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { emojiDb } from '../connection'

export default class StashEmojiCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'stash',
      group: 'emoji',
      memberName: 'stash',
      description: 'Stash an emoji for later',
      userPermissions: ['MANAGE_EMOJIS'],
      args: [
        {
          type: 'string',
          key: 'emoji',
          prompt: 'What emoji should I stash?'
        }
      ]
    })
  }

  async run (message: CommandoMessage, { emoji }: { emoji: string }) {
    const emojiId = emoji.replace(/<:\w+:(\w+)>/, '$1')
    const guildEmoji = message.guild.emojis.cache.find(guildEmoji => guildEmoji.id === emojiId)
    const { url, name } = guildEmoji

    const coll = await emojiDb()
    const existing = await coll.findOne({ guild: message.guild.id, url })
    if (existing) {
      return message.say('This emoji is already saved!')
    }

    await coll.insertOne({ guild: message.guild.id, url, name })

    await guildEmoji.delete()

    return message.say('Emoji saved!')
  }
}
