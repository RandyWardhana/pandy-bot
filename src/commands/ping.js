export default {
  label: 'p:ping',
  name: 'ping',
  value: 'Pong!',
  execute(msg, args) {
    msg.reply('Pong!')
  }
}