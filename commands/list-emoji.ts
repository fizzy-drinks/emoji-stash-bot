import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { emojiDb } from '../connection'

export default class ListEmojiCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'list',
      group: 'emoji',
      memberName: 'list',
      description: 'List all stashed emoji'
    })
  }

  async run (message: CommandoMessage) {
    const coll = await emojiDb()
    const guildEmoji = await coll.find({ guild: message.guild.id }).toArray()
    const emojiList = guildEmoji.map(({ name }: { name: string }) => `\`${name}\``).join(', ')

    return message.say(`**Current stored emoji for ${message.guild.name}:** ${emojiList}`)
  }
}
