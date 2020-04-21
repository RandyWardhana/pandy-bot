import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { AnimeSearch } from '../util/endpoint'
import { send, clear } from '../response'

const embedResult = (msg, params) => {
  let rated = params.rated == null ? 'No Reviews Yet' : params.rated
  const embed = new MessageEmbed()
    .setColor('#2196f3')
    .setAuthor(params.title, params.image_url, params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setDescription(params.synopsis)
    .setThumbnail(params.image_url)
    .setTimestamp(new Date())
    .addField('Episode', params.episodes, true)
    .addField('Score', params.score, true)
    .addField('Rated', rated, true)

  send(msg, embed)
}

export default {
  label: 'p:anime',
  name: 'anime',
  value: 'Find anime by title',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please insert Anime title.\nFor Example: `p:anime {ANIME_TITLE}`')
    } else {
      try {
        send(msg, '```Searching for Anime information....```').then(async (msg) => {
          let result = await axios.get(AnimeSearch(args))

          if (result.data !== undefined) {
            embedResult(msg, result.data.results[0])
          } else {
            send(msg, `Failed to get ${args} statistic`)
          }
          clear(msg)
        }, 0).catch((e) => {
          send(msg, `Failed to get ${args} statistic`)
        })
      } catch (e) {
        send(msg, `Failed to get ${args} statistic`)
      }
    }
  }
}