export default {
  label: 'p:greet',
  name: 'greet',
  value: 'Greeting Someone!',
  execute(msg, args) {
    const customGreetMessage = (taggedUser) => {
      let greets = [
        `Hola, ${taggedUser}`,
        `Hai, ${taggedUser}`,
        `Nice to meet you, ${taggedUser}`,
        `Euy, ${taggedUser}`,
        `Konnichiwa, ${taggedUser}`
      ]
  
      const randomGreeting = Math.floor(Math.random() * greets.length)
  
      msg.channel.send(greets[randomGreeting])
    }

    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first()
      customGreetMessage(taggedUser)
    } else {
      customGreetMessage('everyone!')
    }
  }
}