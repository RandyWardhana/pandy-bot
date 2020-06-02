import { MessageEmbed } from 'discord.js'
import nHentaiAPI from 'nhentai-api-js'

import { send, nsfwCheck } from '../response'

let api = new nHentaiAPI()

const fetchDoujin = () => {
  try {

  } catch (e) {

  }
}

const fetchRandomDoujin = () => {
  api.g(177013).then((res) => {

  }).catch((e) => {

  })
  // try {
  //   let result = await api.random()
  //   console.log(result);
  // } catch (e) {

  // }
}

// /g/274917

export default {
  label: 'p:nhentai',
  name: 'nhentai',
  value: '> Search 6-digit or random hentai code by nhentai. Example of use: \n `p:nhentai 177013` or `p:nhentai random`',
  execute(msg, args) {
    if (!msg.channel.nsfw) {
      nsfwCheck(msg)
    } else {
      const request = args.join(' ')

      if (args.length < 1) {
        send(msg, '```Please input nuclear code to start the journey.\nFor example: p:nhentai {NUCLEAR_CODE} or p:nhentai random```')
      } else {
        if (request === 'random') {
          fetchRandomDoujin()
        } else if (request.length === 6 && !isNaN(request)) {
          fetchDoujin()
        } else {

        }
      }
    }
  }
}