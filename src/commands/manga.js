import axios from 'axios'
import { MessageEmbed } from 'discord.js'
import { formatNumber } from '../util/formatNumber'

export default {
  label: 'p:manga',
  name: 'manga',
  value: 'Find manga by title',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('Please insert Manga title.\nFor Example: `-manga {MANGA_TITLE}`')
    } else {
      const URI = encodeURI(`${process.env.MYANIMELIST_URI}/search/manga?q=${args.join(' ')}&limit=1`)

      try {
        let result = await axios.get(URI)

        if (result.data !== undefined) {
          const {
            url, image_url, title,
            synopsis, chapters, volumes, score
          } = result.data.results[0]

          const embed = new MessageEmbed()
            .setColor('#2196f3')
            .setAuthor(title, image_url, url)
            .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
            .setDescription(synopsis)
            .addField('Chapter', formatNumber(chapters), false)
            .addField('Volumes', formatNumber(volumes), false)
            .addField('Score', score, false)

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