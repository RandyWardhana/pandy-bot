import axios from 'axios'
import _ from 'lodash'
import { MessageEmbed } from 'discord.js'

import { AnimeSearch } from '../util/endpoint'
import { send, errorResponse, successResponse, searching, emptyArgument, failedResponse } from '../response'

const embedResult = (msg, params) => {
  let rated = params.rated == null ? 'No Reviews Yet' : params.rated
  const embed = new MessageEmbed()
    .setColor('#2E52A2')
    .setTitle(params.title)
    .setURL(params.url)
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
  value: '> Find anime on MyAnimeList. Example of use:\n > `p:anime Yuru Camp`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'MyAnimeList').then(async (msg) => {
          let result = await axios.get(AnimeSearch(args))

          if (_.isEmpty(result.data)) {
            failedResponse(msg, args, 'MyAnimeList')
          } else {
            embedResult(msg, result.data.results[0])
            successResponse(msg, 'MyAnimeList')
          }
        }).catch((e) => {
          failedResponse(msg, args, 'MyAnimeList')
        })
      } catch (e) {
        errorResponse(msg, args, 'MyAnimeList')
      }
    }
  }
}