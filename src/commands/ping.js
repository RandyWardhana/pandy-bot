import { reply } from '../response'

export default {
  label: 'p:ping',
  name: 'ping',
  value: 'Pong!',
  execute(msg, args) {
    reply(msg, 'Pong!')
  }
}