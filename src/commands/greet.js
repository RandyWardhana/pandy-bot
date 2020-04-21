import { send } from '../response'

const customGreetMessage = (msg, taggedUser) => {
  let greets = [
    `Hola, ${taggedUser}`,
    `Hai, ${taggedUser}`,
    `Nice to meet you, ${taggedUser}`,
    `Euy, ${taggedUser}`,
    `Konnichiwa, ${taggedUser}`
  ]

  const randomGreeting = Math.floor(Math.random() * greets.length)
  send(msg, greets[randomGreeting])
}

export default {
  label: 'p:greet',
  name: 'greet',
  value: 'Greeting Someone!',
  execute(msg, args) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first()
      customGreetMessage(msg, taggedUser)
    } else {
      customGreetMessage(msg, '@everyone!')
    }
  }
}