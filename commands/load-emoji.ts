import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { emojiDb } from '../connection'

export default class LoadEmojiCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'use',
      group: 'emoji',
      memberName: 'use',
      description: 'Load a stashed emoji into the server',
      userPermissions: ['MANAGE_EMOJIS'],
      args: [
        {
          type: 'string',
          key: 'emoji',
          prompt: 'What emoji should I load?'
        }
      ]
    })
  }

  async run (message: CommandoMessage, { emoji }: { emoji: string }) {
    const coll = await emojiDb()
    const stashedEmoji = await coll.findOne({ guild: message.guild.id, name: emoji })
    if (!stashedEmoji) {
      return message.say(`Emoji \`${emoji}\` not found in this guild!`)
    }

    const guildEmoji = await message.guild.emojis.create(stashedEmoji.url, stashedEmoji.name)
    await coll.deleteOne({ _id: stashedEmoji._id })

    return message.say(`Added emoji <:${guildEmoji.name}:${guildEmoji.id}>`)
  }
}
