import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { YoutubeSearch, YoutubeDetail } from '../util/endpoint'
import { formatNumber } from '../util/formatNumber'
import { send, clear } from '../response'

const embedResult = (msg, params, channelId) => {

  const embed = new MessageEmbed()
    .setColor('#FF0000')
    .setAuthor(params.snippet.title, params.snippet.thumbnails.default.url, `https://www.youtube.com/channel/${channelId}`)
    .setDescription(params.snippet.description)
    .setFooter('Copyright Youtube', 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png')
    .addField('Subscribers', formatNumber(params.statistics.subscriberCount), true)
    .addField('Total Viewers', formatNumber(params.statistics.viewCount), true)
    .addField('Total Video', formatNumber(params.statistics.videoCount), true)

  send(msg, embed)
}

export default {
  label: 'p:youtube',
  name: 'youtube',
  value: 'Get YouTube Channel Subscriber.',
  async execute(msg, args) {
    if (args.length < 1) {
      send(msg, 'Please input Youtube Channel.\nFor Example: `p:youtube {YOUTUBE_CHANNEL}`')
    } else {
      try {
        send(msg, '```Search for Youtube Channel Information....```').then(async (msg) => {
          let result = await axios.get(YoutubeSearch(args))

          if (result.data == undefined) {
            send(msg, 'Failed search Youtube Channel, please makesure your input\nFor Example: `p:youtube {YOUTUBE_CHANNEL}`')
          } else {
            const { channelId } = result.data.items[0].id

            try {
              let response = await axios.get(YoutubeDetail(channelId))

              if (response.data == undefined) {
                send(msg, 'Failed Get Detail Youtube Channel')
              } else {
                embedResult(msg, response.data.items[0], channelId)
              }
            } catch (e) {
              send(msg, 'Failed Get Detail Youtube Channel')
            }
          }
          clear(msg)
        }, 0).catch((e) => {
          send(msg, 'Failed search Youtube Channel, please makesure your input\nFor Example: `p:youtube {YOUTUBE_CHANNEL}`')
        })
      } catch (e) {
        send(msg, 'Failed search Youtube Channel, please makesure your input\nFor Example: `p:youtube {YOUTUBE_CHANNEL}`')
      }
    }
  }
}