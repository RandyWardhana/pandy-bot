import { MessageEmbed } from 'discord.js'
import { send, emptyArgument } from '../response'

const response = (msg, user) => {
  let avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`

  let embed = new MessageEmbed()
    .setColor('#7289DA')
    .setAuthor(`${user.username} #${user.discriminator}`, avatar)
    .setImage(avatar)
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: 'p:steal',
  name: 'steal',
  value: 'Use this command to show your friend personal information!',
  execute(msg, args) {
    if(args.length < 1) {
      emptyArgument(msg)
    } else {
      let user = msg.mentions.users.first()      
      response(msg, user)
    }
  }
}