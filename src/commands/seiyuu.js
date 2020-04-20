import axios from 'axios'
import { MessageEmbed } from 'discord.js'

export default {
  label: 'p:seiyuu',
  name: 'seiyuu',
  value: 'Find seiyuu by name',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('Please insert Seiyuu name.\nFor Example: `-seiyuu {SEIYUU_NAME}`')
    } else {
      const URI = encodeURI(`${process.env.MYANIMELIST_URI}/search/people?q=${args.join(' ')}&limit=1`)

      try {
        let result = await axios.get(URI)

        if (result.data !== undefined) {
          const {
            url, image_url, name,
          } = result.data.results[0]

          const embed = new MessageEmbed()
            .setColor('#2196f3')
            .setAuthor(name, image_url, url)
            .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
            .setImage(image_url)

          msg.channel.send(embed)
        } else {
          msg.channel.send(`Failed to get ${args} statistic`)
        }

      } catch (e) {
        msg.channel.send(`Failed to get ${args} statistic`)
      }
    }
  }
}