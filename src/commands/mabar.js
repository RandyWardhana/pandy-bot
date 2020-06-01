import { send } from '../response'
import _ from 'lodash'

const randomMabarMessage = (msg, args) => {
  let param = _.isEmpty(args) ? '' : args.join(' ').toUpperCase() + ' '

  const message = [
    `> WOY MABAR ${param}@everyone!, UDAH BUKAN WAKTUNYA KERJA ATAUPUN KULIAH!1!1 TINGGALKAN SEMUA AKTIVITAS, KARENA MABAR ${args.join(' ').toUpperCase()} LEBIH PENTING... YAHAHAAAA HAAYYYUUUKKKKK`,
    `> SENDIRI KITA JOMBLO, BERDUA KITA PACARAN, BERTIGA KITA SELINGKUH, BEREMPAT KITA MABAR ${param} @everyone! YAHAHAAAA HAAYYYUUUKKKKK`
  ]

  const randomMessage = Math.floor(Math.random() * message.length)
  send(msg, message[randomMessage])
}

export default {
  label: 'p:mabar',
  name: 'mabar',
  value: '> Announce @everyone to play game together!',
  execute(msg, args) {
    randomMabarMessage(msg, args)
  }
}