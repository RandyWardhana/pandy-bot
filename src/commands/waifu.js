import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { WaifuSearch } from '../util/endpoint'
import { send, clear } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#2196f3')
    .setAuthor(params.name, params.image_url, params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setImage(params.image_url)

  send(msg, embed)
}

export default {
  label: 'p:waifu',
  name: 'waifu',
  value: 'Find waifu by name',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please insert Waifu name.\nFor Example: `p:waifu {WAIFU_NAME}`')
    } else {
      try {
        send(msg, '```Searching for Waifu information....```').then(async (msg) => {
          let result = await axios.get(WaifuSearch(args))
  
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