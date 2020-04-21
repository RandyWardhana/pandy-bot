import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { GifSearch } from '../util/endpoint'
import { send, clear } from '../response'

const errorResult = (msg, args) => {
  send(msg, `Failed to search ${args} in tenor`)
}

const embedResult = (msg, params, args) => {
  const result = new MessageEmbed()
  .setColor('#4AAEFE')
  .setAuthor(args, 'https://tenor.com/assets/img/tenor-app-icon.png', params.url)
  .setFooter('Copyright Tenor', 'https://tenor.com/assets/img/tenor-app-icon.png')
  .setImage(params.url)

  send(msg, result)
}

export default {
  label: 'p:gif',
  name: 'gif',
  value: 'Search Tenor Gif',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please insert input something to search gif.\nFor Example: `p:gif {RANDOM}`')
    } else {
      try {
        send(msg, '```Searching for GIF result....```').then(async (msg) => {
          let result = await axios.get(GifSearch(args))
  
          if (result.data !== undefined) {
            embedResult(msg, result.data.results[0].media[0].gif, args)
          } else {
            errorResult(msg, args)
          }
          clear(msg)
        }, 0).catch((e) => {
          errorResult(msg, args)
        })
      } catch (e) {
        errorResult(msg, args)
      }
    }
  }
}