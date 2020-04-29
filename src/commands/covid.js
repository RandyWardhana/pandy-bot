import moment from 'moment'
import axios from 'axios'
import { MessageEmbed } from 'discord.js'

import { CovidSearch } from '../util/endpoint'
import { send, clear, errorResponse, successResponse, searching, emptyArgument } from '../response'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#15a97b')
    .setAuthor(`${params.Country}, ${params.CountryCode}`, '')
    .setFooter('Copyright covid19api.com', '')
    .setTimestamp(new Date())
    .addField('Confirmed', params.Confirmed, false)
    .addField('Deaths', params.Deaths, false)
    .addField('Recovered', params.Recovered, false)
    .addField('Active', params.Active, false)
    .addField('Last Updated', moment(params.Date).locale('id').format('DD MMM YYYY, HH:mm'), false)

  send(msg, embed)
}

export default {
  label: 'p:covid',
  name: 'covid',
  value: 'Tracking Covid-19 Case',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      let country = args.shift().toLowerCase()
      let todayDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00Z`

      try {
        searching(msg, country, 'Covid-19', 'covid').then(async (msg) => {
          let result = await axios.get(CovidSearch(country, todayDate))
          if (result.data !== undefined) {
            embedResult(msg, result.data[0])
          } else {
            errorResponse(msg, country, 'Covid-19', 'covid')
          }
          successResponse(msg, 'Covid-19')
        }).catch((e) => {
          errorResponse(msg, country, 'Covid-19', 'covid')
        })
      } catch (e) {
        errorResponse(msg, country, 'Covid-19', 'covid')
      }
    }
  }
}