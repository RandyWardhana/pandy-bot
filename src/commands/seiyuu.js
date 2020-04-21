import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { SeiyuuSearch } from '../util/endpoint'
import { send, clear } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#2196f3')
    .setAuthor(params.name, params.image_url, params.url)
    .setFooter('Copyright MyAnimeList', 'https://cdn.myanimelist.net/images/faviconv5.ico')
    .setImage(params.image_url)
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: 'p:seiyuu',
  name: 'seiyuu',
  value: 'Find seiyuu by name',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please insert Seiyuu name.\nFor Example: `p:seiyuu {SEIYUU_NAME}`')
    } else {
      try {
        send(msg, '```Searching for Seiyuu information....```').then(async (msg) => {
          let result = await axios.get(SeiyuuSearch(args))
  
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