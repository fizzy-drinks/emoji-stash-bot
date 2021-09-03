import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

export default class MeowCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'miaaau',
      aliases: ['miau'],
      group: 'miau',
      memberName: 'miau',
      description: 'miau'
    })
  }

  async run (message: CommandoMessage) {
    message.react('😼')
    return message
  }
}
