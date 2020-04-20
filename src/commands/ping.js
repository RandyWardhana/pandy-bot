export default {
  name: '-ping',
  value: 'Pong!',
  execute(msg, args) {
    msg.reply('Pong!')
  }
}