import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { SeiyuuSearch } from '../util/endpoint'
import { send, searching, errorResponse, successResponse, emptyArgument } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#2E52A2')
    .setTitle(params.name)
    .setURL(params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setImage(params.image_url)
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: 'p:seiyuu',
  name: 'seiyuu',
  value: '> Find seiyuu on MyAnimeList. Example of use:\n > `p:seiyuu Kana Hanazawa`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'MyAnimeList').then(async (msg) => {
          let result = await axios.get(SeiyuuSearch(args))
  
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