import moment from 'moment'
import axios from 'axios'
import { MessageEmbed } from 'discord.js'

export default {
  label: 'p:covid',
  name: 'covid',
  value: 'Tracking Covid-19 Case',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('Please insert country')
    } else {
      let country = args.shift().toLowerCase()
      let todayDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00Z`

      const URI = encodeURI(`${process.env.COVID_URI}/country/${country}/status/Confirmed/date/${todayDate}`)

      try {
        let result = await axios.get(URI)

        if (result.data !== undefined) {
          const {
            Country, CountryCode, Confirmed,
            Deaths, Recovered, Active, Date
          } = result.data[0]

          const embed = new MessageEmbed()
            .setColor('#15a97b')
            .setAuthor(`${Country}, ${CountryCode}`, '')
            .setFooter('Copyright covid19api.com', '')
            .addField('Confirmed', Confirmed, false)
            .addField('Deaths', Deaths, false)
            .addField('Recovered', Recovered, false)
            .addField('Active', Active, false)
            .addField('Last Updated', moment(Date).locale('id').format('DD MMM YYYY, HH:mm'), false)

          msg.channel.send(embed)
        } else {
          msg.channel.send(`Failed to get Covid-19 information from ${country}`)
        }

      } catch (e) {
        msg.channel.send(`Failed to get Covid-19 information from ${country}`)
      }
    }
  }
}