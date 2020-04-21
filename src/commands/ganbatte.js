const customGanbatteMessage = (taggedUser, msg) => {
  let Ganbattes = [
    `Ganbatte, ${taggedUser}! :100: :fire:`,
    `Ganbatte Kudasai, ${taggedUser}! :100: :fire:`,
    `You can do it, ${taggedUser}! :100: :fire:`,
  ]

  const randomGanbatte = Math.floor(Math.random() * Ganbattes.length)
  if (taggedUser == '') msg.reply(Ganbattes[randomGanbatte])
  else msg.channel.send(Ganbattes[randomGanbatte])
}

export default {
  label: 'p:ganbatte',
  name: 'ganbatte',
  value: 'Give encouragement to someone!',
  execute(msg, args) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first()
      customGanbatteMessage(taggedUser, msg)
    } else {
      customGanbatteMessage('', msg)
    }
  }
}