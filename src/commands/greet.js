export default {
  name: '-greet',
  value: 'Greeting Someone!',
  execute(msg, args) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first()
      msg.channel.send(`Hola, ${taggedUser}!`)
    } else {
      msg.channel.send(`Hola, everyone!`)
    }
  }
}