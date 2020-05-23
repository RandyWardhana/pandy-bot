import { send, emptyArgument } from '../response'

const renderFanBase = (msg, args) => {
  // args[1] = User Tagged
  // args[2] = Idola
  // args[3] = Kategori
  // args[4] = Skill
  // args[5] = Platform
  // args[6] = Fans

  const taggedUser = msg.mentions.users.first()
  let template = `
    MAKSUD LO APA HINA2 ${args[2]} HAH!? GUE MESTI KASIH TAU YA ${args[2]} ITI RAJANYA ${args[3]}! ${args[2]} GUA UDAH MENGUNJUNGI NOMINASI2 ${args[3]} TERATAS, DAN PUNYA LEBIH DARI 200 PENGHARGAAN! ${args[2]} GUE UDAH TERLATIH ${args[4]} DAN ${args[2]} ITI GRUP TERBAIK DI SEGALA INDUSTRI ${args[5]}. MUKA LU GAADA APA2NYA DIBANDING SAMA ${args[2]} GUA ${args[6]} BAKAL NGINCAR LO SAMPE ELO GABAKAL ADA DI BUMI INI! CAMKAN KATA KATA ${args[6]}!!!! LU PIKIR LU BISA SEENAK NYA NGATAIN ${args[2]} GUE BEGITU AJA? PIKIR ULANG NJING! PAS GUA NGETIK INI GUA UDAH HUBUNGIN DAN MEMANGGIL SELURUH ${args[6]} DI SEKOJUR DUNIA DAN MUKA LU UDAH GW LACAK BUAT UU ITE! ${args[6]} ADA DIMANA-MANA KAPAN AJA DAN BISA BULLY ELU DENGAN SEGALA CARA, COBA AJA LO GAK NGEHINA ${args[2]} GW ATAU LU BISA JAGA MUKUT. LO NGGA BISA KAN? ${args[6]} BAKAL HANCUR SAMA KAWAN2 LO YANG LAIN YANG HINA ${args[2]}, LU BAKAL MATI ${taggedUser}!
  `

  send(msg, template.toUpperCase())
}

const renderEngas = (msg, args) => {
  const [first, ...remaining] = args

  let template = `
    ANJING ${remaining.join(' ')} GA LU, ${remaining.join(' ')} SEKARANG!!! GUA DAH GAK TAHAN, LO POKOKNYA HARUS ${remaining.join(' ')} ANJING PLEASE LO GATAU APA SETIAP HARINYA LIAT LU SLIWAR SLIWER, GUA NGACENG BANGSATTTT LU PAHAM GA SIH SELAMA INI GUA PENGEN LIAT ELU ${remaining.join(' ')}, TAU GAK GUA SELALU NAHAN HORNY, DI KANTOR , DI WARUNG, DI RUMAH CUMA PENGEN PUAS PUASIN HASRAT GUA BUAT LIAT ELU ${remaining.join(' ')} PLIS SEKALI AJA PLIS, GAPEDULI DILUAR SANA APA YANG TERJADI, ELO ${remaining.join(' ')} GUA UDAH SENENG BANGSAT ANJING LU KUDU PAHAM GUA GA SUDI KEHILANGAN ELU, LU HARUS SETIDAKNYA ${remaining.join(' ')} DAN MEMBEKAS DI MEMORI INDAH GUA PLIS DEH GW MINTA SEGENAP HATI GW AGAR LU ${remaining.join(' ')}
  `

  send(msg, template.toUpperCase())
}

const renderIndihomo = (msg, args) => {
  const [first, ...remaining] = args

  let template = `
  Halo Kak ${remaining.join(' ')},  kendala yang dialami Kami sarankan silakan restart modemnya selama 10 menit, jika masih berkendala silakan lakukan unplug/lepas-pasang kabel patch cord (kabel berwarna hitam/kuning dengan ujung biru) ke ONT (modem). Jika masih berkendala silakan informasikan nomor IndiHome nya, atas nama pemilik dan nomor HP yang aktif via Inbox ya Kakak. Terima kasih
  `

  send(msg, template)
}

const renderLebaran = (msg, args) => {
  let template = 'Mohon dimaafkan kesalahan2 yang pernah ku lakukan baik yang disengaja dan tidak, minal aidin wal faidzin mohon maaf lahir dan batin🙏 @everyone'

  send(msg, template)
}

const renderTemplate = (msg, args) => {
  switch (args[0]) {
    case 'fanbase':
      return renderFanBase(msg, args)
    case 'engas':
      return renderEngas(msg, args)
    case 'indihomo':
      return renderIndihomo(msg, args)
    case 'lebaran':
      return renderLebaran(msg, args)
  }
}

export default {
  label: 'p:template',
  name: 'template',
  value: '> Template for roasting like an idiot. How to use it:\n > `p:template fanbase [mention_someone] [idol] [idol_category] [idol_skill] [idol_platform] [fans_name]` or `p:template engas <bottom_text>`',
  execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      renderTemplate(msg, args)
    }
  }
}