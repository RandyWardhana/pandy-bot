import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { YoutubeSearch, YoutubeDetail } from '../util/endpoint'
import { formatNumber } from '../util/formatNumber'
import { send, searching, errorResponse, successResponse, emptyArgument } from '../response'

const embedResult = (msg, params, channelId) => {

  const embed = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle(params.snippet.title)
    .setURL(`https://www.youtube.com/channel/${channelId}`)
    .setDescription(params.snippet.description)
    .setFooter('Copyright Youtube', 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png')
    .addField('Subscribers', formatNumber(params.statistics.subscriberCount), true)
    .addField('Total Viewers', formatNumber(params.statistics.viewCount), true)
    .addField('Total Video', formatNumber(params.statistics.videoCount), true)
    .setThumbnail(params.snippet.thumbnails.default.url)
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: 'p:youtube',
  name: 'youtube',
  value: '> Get YouTube Channel Subscriber. Example of use: \n > `p:youtube Dota Wtf`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'YouTube').then(async (msg) => {
          let result = await axios.get(YoutubeSearch(args))

          if (result.data == undefined) {
            errorResponse(msg, args, 'YouTube')
          } else {
            const { channelId } = result.data.items[0].id

            try {
              let response = await axios.get(YoutubeDetail(channelId))

              if (response.data == undefined) {
                errorResponse(msg, args, 'YouTube')
              } else {
                embedResult(msg, response.data.items[0], channelId)
              }
            } catch (e) {
              errorResponse(msg, args, 'YouTube')
            }
          }
          successResponse(msg, 'YouTube')
        }, 0).catch((e) => {
          errorResponse(msg, args, 'YouTube')
        })
      } catch (e) {
        errorResponse(msg, args, 'YouTube')
      }
    }
  }
}