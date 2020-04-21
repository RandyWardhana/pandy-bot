import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { MangaSearch } from '../util/endpoint'
import { formatNumber } from '../util/formatNumber'
import { send, clear } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#2196f3')
    .setAuthor(params.title, params.image_url, params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setDescription(params.synopsis)
    .addField('Chapter', formatNumber(params.chapters), false)
    .addField('Volumes', formatNumber(params.volumes), false)
    .addField('Score', params.score, false)
  
  send(msg, embed)
}

export default {
  label: 'p:manga',
  name: 'manga',
  value: 'Find manga by title',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please insert Manga title.\nFor Example: `p:manga {MANGA_TITLE}`')
    } else {
      try {
        send(msg, '```Searching for manga information....```').then(async (msg) => {
          let result = await axios.get(MangaSearch(args))
          
          if (result.data !== undefined) {
            embedResult(msg, result.data.results[0])
          } else {
            send(msg, `Failed to get ${args} statistic`)
          }
          clear(msg)
        }, 0).catch((e) => {
          clear(msg)
          send(msg, `Failed to get ${args} statistic`)
        })

      } catch (e) {
        send(msg, `Failed to get ${args} statistic`)
      }
    }
  }
}