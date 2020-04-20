import axios from 'axios'
import { MessageEmbed } from 'discord.js'

export default {
  label: 'p:anime',
  name: 'anime',
  value: 'Find anime by title',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('Please insert Anime title.\nFor Example: `-anime {ANIME_TITLE}`')
    } else {
      const URI = encodeURI(`${process.env.MYANIMELIST_URI}/search/anime?q=${args.join(' ')}&limit=1`)

      try {
        let result = await axios.get(URI)

        if (result.data !== undefined) {
          const {
            url, image_url, title,
            synopsis, episodes, score, rated
          } = result.data.results[0]

          const embed = new MessageEmbed()
            .setColor('#2196f3')
            .setAuthor(title, image_url, url)
            .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
            .setDescription(synopsis)
            .addField('Episode', episodes, false)
            .addField('Score', score, false)
            .addField('Rated', rated, false)

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