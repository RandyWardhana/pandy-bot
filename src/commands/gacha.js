import { MessageEmbed } from 'discord.js'
import { send, emptyArgument } from "../response"

const response = (msg, user) => {
  let avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`

  let embed = new MessageEmbed()
    .setColor('#4286f4')
    .setAuthor(user.username, avatar)
    .setThumbnail(avatar)
    .setTimestamp(new Date())
    .setTitle(`Selamat kepada ${user.username}!!`)
    .setDescription('Kamu menang dalam gacha kali ini!\nJangan lupa traktirannya ye~')

  send(msg, embed)
}

export default {
  label: 'p:gacha',
  name: 'gacha',
  value: '> Gacha something, please mention 2 or more people to use this command!. Example of use: \n > `p:gacha @Pandy @Myself`',
  execute(msg, args) {
    if (args.length < 2) {
      emptyArgument(msg)
    } else {
      let user = msg.mentions.users.random()
      response(msg, user)
    }
  }
}