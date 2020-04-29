import { send, emptyArgument } from '../response'

const renderTemplate = (msg, args) => {
  // args[0] = User Tagged
  // args[1] = Idola
  // args[2] = Kategori
  // args[3] = Skill
  // args[4] = Platform
  // args[5] = Fans

  const taggedUser = msg.mentions.users.first()
  let template = `
    MAKSUD LO APA HINA2 ${args[1]} HAH!? GUE MESTI KASIH TAU YA ${args[1]} ITI RAJANYA ${args[2]}! ${args[1]} 
    GUA UDAH MENGUNJUNGI NOMINASI2 ${args[2]} TERATAS, DAN PUNYA LEBIH DARI 200 PENGHARGAAN! ${args[1]} GUE UDAH TERLATIH ${args[3]} 
    DAN ${args[1]} ITI GRUP TERBAIK DI SEGALA INDUSTRI ${args[4]}. MUKA LU GAADA APA2NYA DIBANDING SAMA ${args[1]} GUA ${args[5]} 
    BAKAL NGINCAR LO SAMPE ELO GABAKAL ADA DI BUMI INI! CAMKAN KATA KATA ${args[5]}!!!! LU PIKIR LU BISA SEENAK NYA NGATAIN ${args[1]} 
    GUE BEGITU AJA? PIKIR ULANG NJING! PAS GUA NGETIK INI GUA UDAH HUBUNGIN DAN MEMANGGIL SELURUH ${args[5]} 
    DI SEKOJUR DUNIA DAN MUKA LU UDAH GW LACAK BUAT UU ITE! ${args[5]} ADA DIMANA-MANA KAPAN AJA DAN BISA BULLY ELU DENGAN SEGALA CARA, 
    COBA AJA LO GAK NGEHINA ${args[1]} GW ATAU LU BISA JAGA MUKUT. LO NGGA BISA KAN? ${args[5]} BAKAL HANCUR SAMA KAWAN2 LO YANG LAIN YANG HINA 
    ${args[1]}, LU BAKAL MATI ${taggedUser}!
  `

  send(msg, template.toUpperCase())
}

export default {
  label: 'p:template',
  name: 'template',
  value: '> Template for roasting like an idiot. How to use it:\n > `p:template [mention_someone] [idol] [idol_category] [idol_skill] [idol_platform] [fans_name]`',
  execute(msg, args) {
    if (args.length < 1) {
      emptyArgument(msg)
    } else {
      renderTemplate(msg, args)
    }
  }
}