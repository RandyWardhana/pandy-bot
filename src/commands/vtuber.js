import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { VtuberSearch, VtuberDetail, VtuberAvatar } from '../util/endpoint'
import { send, searching, errorResponse, successResponse, emptyArgument } from '../response'

const renderPersonality = (params) => {
  let content = ''

  params.map((res) => {
    if (res.title.includes('Personality')) {
      if (res.content.length > 0) {
        res.content.map((item, index) => {
          if (index < 1) content += `${item.text}\n\n`
        })
      } else {
        content = "Personality hasn't added yet."
      }
    } else {
      content = "Personality hasn't added yet."
    }
  })
  return content
}

const renderBackground = (params) => {
  let content = ''

  params.map((res) => {
    if (res.title.includes('Background')) {
      if (res.content.length > 0) {
        res.content.map((item, index) => {
          if (index < 1) content += `${item.text}\n\n`
        })
      } else {
        content = "Background hasn't added yet."
      }
    }
  })
  return content
}

const renderFans = (params) => {
  let content = ''

  params.map((res) => {
    if (res.title.includes('Fans')) {
      if (res.content.length > 0) {
        res.content.map((item) => {
          item.elements.map((data, index) => {
            if (index < 1) content += `${data.text}\n\n`
          })
        })
      } else {
        content = "Fans hasn't added yet."
      }
    }
  })
  return content
}

const embedResult = (msg, params, avatar, url) => {
  const embed = new MessageEmbed()
    .setColor('#08D6D6')
    .setTitle(params[0].title)
    .setDescription(params[0].content[0].text)
    .setURL(url)
    .setTimestamp(new Date())
    .setThumbnail(avatar)
    // .addField('Personality', renderPersonality(params))
    // .addField('Background', renderBackground(params))
    .addField('Fans', renderFans(params))
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
                let dataAvatar = resultAvatar.data.items[id].thumbnail

                const avatar = dataAvatar.replace(/(\s)/g, '')

                embedResult(msg, dataDetail, avatar, url)
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