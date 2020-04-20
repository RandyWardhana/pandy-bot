import axios from 'axios'
import { MessageEmbed } from 'discord.js'
import { formatNumber } from '../util/formatNumber'

export default { 
  label: 'p:youtube',
  name: 'youtube',
  value: 'Get YouTube Channel Subscriber',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('Please input Youtube Channel.\nFor Example: `-youtube {YOUTUBE_CHANNEL}`')
    } else {
      const URI_SEARCH = encodeURI(`${process.env.YOUTUBE_URI}/search?part=snippet&maxResult=1&order=relevance&q=${args.join(' ')}&type=channel&key=${process.env.YOUTUBE_API_KEY}`)
      
      try {
        let result = await axios.get(URI_SEARCH)
        
        if (result.data == undefined) {
          msg.channel.send('Failed search Youtube Channel, please makesure your input\nFor Example: `-youtube {YOUTUBE_CHANNEL}`')
        } else {
          const { channelId } = result.data.items[0].id
          const URI_DETAIL_CHANNEL = encodeURI(`${process.env.YOUTUBE_URI}/channels?part=snippet,statistics&key=${process.env.YOUTUBE_API_KEY}&id=${channelId}`)

          try {
            let response = await axios.get(URI_DETAIL_CHANNEL)
            
            if (response.data == undefined) {
              msg.channel.send('Failed Get Detail Youtube Channel')
            } else {
              const { snippet, statistics } = response.data.items[0]
              
              const embed = new MessageEmbed()
              .setColor('#FF0000')
              .setAuthor(snippet.title, snippet.thumbnails.default.url, `https://www.youtube.com/channel/${channelId}`)
              .setDescription(snippet.description)
              .setFooter('Copyright Youtube', 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png')
              .addField('Subscribers', formatNumber(statistics.subscriberCount), true)
              .addField('Total Viewers', formatNumber(statistics.viewCount), true)
              .addField('Total Video', formatNumber(statistics.videoCount), true)
              
              msg.channel.send(embed)
            }
            
          } catch (e) {
            msg.channel.send('Failed Get Detail Youtube Channel')
          }

        }
        
      } catch(e) {
        msg.channel.send('Failed search Youtube Channel, please makesure your input\nFor Example: `-youtube {YOUTUBE_CHANNEL}`')
      }
    }
  }
}