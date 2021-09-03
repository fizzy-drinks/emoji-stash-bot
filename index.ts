import dotenv from 'dotenv'
import { CommandoClient } from 'discord.js-commando'
import MeowCommand from './commands/miaaau'
import StashEmojiCommand from './commands/stash-emoji'
import ListEmojiCommand from './commands/list-emoji'
import LoadEmojiCommand from './commands/load-emoji'
import EmojiPackCommand from './commands/emoji-pack'
import PreviewEmojiCommand from './commands/preview-emoji'

dotenv.config()

// perms 1074104384

const bot = new CommandoClient({
  commandPrefix: 'esb.',
  owner: '544967412005732368'
})

bot.once('ready', async () => {
  console.log('Ready at servers', bot.guilds.cache.map(guild => guild.name))
})

bot.registry
  .registerGroups([
    ['miau', 'Miaaau'],
    ['emoji', 'Actual emoji-related commands']
  ])
  .registerDefaults()
  .registerCommands([
    MeowCommand,
    StashEmojiCommand,
    ListEmojiCommand,
    LoadEmojiCommand,
    EmojiPackCommand,
    PreviewEmojiCommand
  ])

bot.on('error', console.error)

bot.login(process.env.TOKEN)
