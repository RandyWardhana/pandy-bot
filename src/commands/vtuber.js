import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { VtuberSearch, VtuberDetail, VtuberAvatar } from '../util/endpoint'
import { send, clear, searching, errorResponse, successResponse, emptyArgument } from '../response'

const embedResult = (msg, params, title, avatar, url) => {
  // let description = 
  const embed = new MessageEmbed()
    .setColor('#08D6D6')
    .setTitle(title)
    .setURL(url)
    .setThumbnail(avatar)
    .addField('Background', )
    .setFooter('Powered by Fandom', 'https://i.dlpng.com/static/png/6965866_preview.png')

  send(msg, embed)
}

export default {
  label: 'p:vtuber',
  name: 'vtuber',
  value: '> Find Virtual Youtuber on Fandom. Example of use:\n > `p:vtuber Minato Aqua`',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      try {
        searching(msg, args, 'Fandom').then(async (msg) => {
          let result = await axios.get(VtuberSearch(args))

          if (result.data == undefined) {
            errorResponse(msg, args, 'Fandom')
          } else {
            const { id, url } = result.data.items[0]
            
            try {
              let resultDetail = await axios.get(VtuberDetail(id))
              let resultAvatar = await axios.get(VtuberAvatar(id))
              
              if (resultDetail.data == undefined) {
                errorResponse(msg, args, 'Fandom')
              } else {
                let dataDetail = resultDetail.data.sections
                let title = dataDetail[0].title
                let dataAvatar = resultAvatar.data.items[id].thumbnail
                
                const avatar = dataAvatar.replace(/(\s)/g, '')
                
                embedResult(msg, dataDetail, title, avatar, url)
              }
            } catch (e) {
              errorResponse(msg, args, 'Fandom')
            }
          }
          successResponse(msg, 'Fandom')
        }, 0)
      } catch (e) {
        errorResponse(msg, args, 'Fandom')
      }
    }
  }
}