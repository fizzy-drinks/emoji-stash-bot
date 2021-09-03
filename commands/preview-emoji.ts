import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { emojiDb } from '../connection'

export default class PreviewEmojiCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'preview',
      group: 'emoji',
      memberName: 'preview',
      description: 'View a stashed emoji',
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

    return message.say(stashedEmoji.url)
  }
}
