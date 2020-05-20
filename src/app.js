import dotenv from 'dotenv'
import Discord from 'discord.js'

import { send } from './response'

dotenv.config()

const client = new Discord.Client()

client.commands = new Discord.Collection();
const botCommands = require('./commands');

const activities_list = [
  "Playing",
  "p:help for help"
]

const availableCommand = [
  'p:',
  'euy pandy, ',
  'assalamualaikum, ',
  'bismillah, ',
]

Object.keys(botCommands).map(key => {
  client.commands.set(botCommands[key].name, botCommands[key]);
})

const startCommand = (prefix, message) => {
  return message.toLowerCase().startsWith(prefix)
}

const parseCommand = (prefix, message) => {
  const checkParseCommand = startCommand(prefix, message) || startCommand('euy pandy, ', message) || startCommand('assalamualaikum, ', message) || startCommand('bismillah, ', message)
  if (checkParseCommand) {
    const split = message.toLowerCase().replace(prefix, '').replace('euy pandy, ', '').replace('assalamualaikum, ', '').replace('bismillah, ', '').split(/ /g)
    const command = split.shift().toLowerCase()

    return command
  } else {
    send(msg, 'Invalid command, please type `p:help` to see available commands!')
  }
}

const helperCommand = (msg) => {
  let fields = []
  
  client.commands.map((item) => {
    if (item.label !== 'p:help') fields.push({ name: "`" + item.label + "`", value: item.value })
  })

  const embed = new Discord.MessageEmbed()
    .setColor('#FAA61A')
    .setTitle('Pandy Helper Command')
    .addFields(fields)

  send(msg, embed)
}

client.on('ready', () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index])
  }, 10000);
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
  const args = msg.content.toLowerCase().replace('p:', '').replace('euy pandy, ', '').replace('assalamualaikum, ', '').replace('bismillah, ', '').split(/ /g)
  const checkParseCommand = startCommand('p:', msg.content) || startCommand('euy pandy, ', msg.content) || startCommand('assalamualaikum, ', msg.content) || startCommand('bismillah, ', msg.content)
  const command = args.shift().toLowerCase()

  if (!msg.author.bot) {
    try {
      if (checkParseCommand) {
        if (command === 'help') {
          helperCommand(msg)
        }
      }

      const parse = parseCommand('p:', msg.content)
      if (!client.commands.has(parse)) send(msg, 'Invalid command, please type `p:help` to see available commands!')

      client.commands.get(parse).execute(msg, args);
    } catch (error) {

    }
  }

})

client.login(process.env.DISCORD_TOKEN)