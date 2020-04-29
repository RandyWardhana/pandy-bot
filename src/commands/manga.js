import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { MangaSearch } from '../util/endpoint'
import { formatNumber } from '../util/formatNumber'
import { send, errorResponse, successResponse, searching, emptyArgument } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#2E52A2')
    .setTitle(params.title)
    .setURL(params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setDescription(params.synopsis)
    .setThumbnail(params.image_url)
    .setTimestamp(new Date())
    .addField('Chapter', formatNumber(params.chapters), true)
    .addField('Volumes', formatNumber(params.volumes), true)
    .addField('Score', params.score, true)

  send(msg, embed)
}

export default {
  label: 'p:manga',
  name: 'manga',
  value: '> Find manga on MyAnimeList. Example of use:\n > `p:manga Komi San`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'MyAnimeList').then(async (msg) => {
          let result = await axios.get(MangaSearch(args))

          if (result.data !== undefined) {
            embedResult(msg, result.data.results[0])
          } else {
            errorResponse(msg, args, 'MyAnimeList')
          }
          successResponse(msg, 'MyAnimeList')
        }, 0).catch((e) => {
          errorResponse(msg, args, 'MyAnimeList')
        })
      } catch (e) {
        errorResponse(msg, args, 'MyAnimeList')
      }
    }
  }
}