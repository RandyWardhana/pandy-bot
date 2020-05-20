import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import { MessageEmbed } from 'discord.js'

import { send, errorResponse, successResponse, searching, emptyArgument, failedResponse } from '../response'
import { CovidSearch } from '../util/endpoint'
import { formatNumber } from '../util/formatNumber'

const embedResult = (msg, params) => {
  const embed = new MessageEmbed()
    .setColor('#15a97b')
    .setAuthor(`${params.country}`, '')
    .setFooter('Copyright coronavirus-19-api.herokuapp.com', '')
    .setTimestamp(new Date())
    .addField('Today Cases', formatNumber(params.todayCases), true)
    .addField('Today Deaths', formatNumber(params.todayDeaths), false)
    .addField('Cases', formatNumber(params.cases), true)
    .addField('Deaths', formatNumber(params.deaths), true)
    .addField('Recovered', formatNumber(params.recovered), true)
    .addField('Active', formatNumber(params.active), true)
    .addField('Critical Condition', formatNumber(params.critical), true)
    .addField('Last Updated', moment(params.Date).locale('id').format('DD MMM YYYY, HH:mm'), true)

  send(msg, embed)
}

export default {
  label: 'p:covid',
  name: 'covid',
  value: '> Tracking Covid-19 Case. Example of use: \n> p:covid Indonesia',
  async execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      let country = args.shift().toLowerCase()
      let todayDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00Z`

      try {
        searching(msg, country, 'Covid-19', 'covid').then(async (msg) => {
          let result = await axios.get(CovidSearch(country))
          
          if (_.isEmpty(result.data)) {
            failedResponse(msg, country, 'Covid-19', 'covid')
          } else {
            embedResult(msg, result.data)
            successResponse(msg, 'Covid-19')
          }
        }).catch((e) => {
          failedResponse(msg, country, 'Covid-19', 'covid')
        })
      } catch (e) {
        errorResponse(msg, country, 'Covid-19', 'covid')
      }
    }
  }
}