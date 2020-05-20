import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { emptyArgument, errorResponse, searching, successResponse, send } from '../response'
import { SauceSearch } from '../util/endpoint'

const embedResponse = (msg, params, imageURL) => {
  const embed = new MessageEmbed()
    .setColor('#011627')
    .setThumbnail(imageURL)
    .setTitle(params.title_romaji)
    .setURL(`https://myanimelist.net/anime/${params.mal_id}`)
    .addField('Title', params.title)
    .addField('English Title', params.title_english)
    .addField('Similarity', params.similarity.toFixed(2))
    .addField('Episode', params.episode)
    .setFooter('Copyright TraceMoe', 'https://trace.moe/favicon.png')
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: 'p:sauce',
  name: 'sauce',
  value: '> Find sauce on TraceMoe. Example of use:\n > `p:sauce <insert anime image>`',
  async execute(msg, args) {
    let Attachment = (msg.attachments).array()
    
    if (Attachment.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, 'Sauce', 'TraceMoe', 'sauce').then(async (msg) => {
          let result = await axios.get(SauceSearch(Attachment[0].url))

          if (result.data.docs !== undefined) {
            embedResponse(msg, result.data.docs[0], Attachment[0].url)
          } else {
            errorResponse(msg, 'Sauce', 'TraceMoe', 'sauce')
          }
          successResponse(msg, 'TraceMoe')
        }, 0).catch((e) => {
          errorResponse(msg, 'Sauce', 'TraceMoe', 'sauce')
        })
      } catch (e) {
        errorResponse(msg, 'Sauce', 'TraceMoe', 'sauce')
      }
    }
  }
}