import { send } from '../response'

export default {
  label: 'p:mabar',
  name: 'mabar',
  value: '> Announce @everyone to play game together!',
  execute(msg, args) {
    send(msg, '> WOY MABAR @everyone!, UDAH BUKAN WAKTUNYA KERJA ATAUPUN KULIAH!1!1 TINGGALKAN SEMUA AKTIVITAS, KARENA MABAR LEBIH PENTING')
  }
}