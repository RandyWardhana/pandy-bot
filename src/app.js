import dotenv from 'dotenv'
import Discord from 'discord.js'

dotenv.config()

const client = new Discord.Client()

client.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  client.commands.set(botCommands[key].name, botCommands[key]);
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

// client.on('message', messageHandler)
client.on('message', msg => {
  const args = msg.content.split(/ +/)
  const command = args.shift().toLowerCase()
  
  if (command === '-help') {
    let fields = []
    client.commands.map((item) => {
      fields.push({ name: "`"+item.name+"`", value: item.value })
    })

    const embed = new Discord.MessageEmbed()
    .setColor('#2196F3')
    .setTitle('Pandy Helper Command')
    .addFields(fields)

    return msg.channel.send(embed)
  }

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    msg.reply('Invalid Command!');
  }
})

client.login(process.env.DISCORD_TOKEN)