import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { GifSearch } from '../util/endpoint'
import { send, searching, successResponse, errorResponse, emptyArgument } from '../response'

const embedResult = (msg, params, args) => {
  const result = new MessageEmbed()
  .setColor('#4AAEFE')
  .setAuthor(args.join(' '), 'https://tenor.com/assets/img/tenor-app-icon.png', params.url)
  .setFooter('Copyright Tenor', 'https://tenor.com/assets/img/tenor-app-icon.png')
  .setImage(params.url)
  .setTimestamp(new Date())

  send(msg, result)
}

export default {
  label: 'p:gif',
  name: 'gif',
  value: '> Find Gif on Tenor. Example of use:\n > `p:gif Press F`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'Tenor').then(async (msg) => {
          let result = await axios.get(GifSearch(args))
  
          if (result.data !== undefined) {
            embedResult(msg, result.data.results[0].media[0].gif, args)
          } else {
            errorResponse(msg, args, 'Tenor')
          }
          successResponse(msg, 'Tenor')
        }).catch((e) => {
          errorResponse(msg, args, 'Tenor')
        })
      } catch (e) {
        errorResponse(msg, args, 'Tenor')
      }
    }
  }
}