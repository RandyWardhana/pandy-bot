import { send } from '../response'
import _ from 'lodash'

export default {
  label: 'p:mabar',
  name: 'mabar',
  value: '> Announce @everyone to play game together!',
  execute(msg, args) {
    let param = _.isEmpty(args) ? '' : args.join(' ').toUpperCase() + ' '

    send(msg, `> WOY MABAR ${param}@everyone!, UDAH BUKAN WAKTUNYA KERJA ATAUPUN KULIAH!1!1 TINGGALKAN SEMUA AKTIVITAS, KARENA MABAR ${args.join(' ').toUpperCase()} LEBIH PENTING... YAHAHAAAA HAAYYYUUUKKKKK`)
  }
}