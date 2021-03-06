import { reply, send } from '../response'

const RandomMessage = (msg, taggedUser, randomIQ) => {
  let customMessage
  switch (true) {
    case randomIQ <= 50:
      customMessage = 'Hahaha, such a fool :zany_face: :zany_face:'
      break
    case randomIQ <= 100:
      customMessage = 'Hey, not bad :thinking: :thinking: '
      break
    case randomIQ <= 150:
      customMessage = 'Quite smart, huh :100: :100: '
      break
    case randomIQ <= 200:
      customMessage = 'Fantastic! :100: :100: :fire: :fire: '
      break
  }

  if (taggedUser == '') reply(msg, `Your IQ is: ${randomIQ}. ${customMessage}`)
  else send(msg, `${taggedUser} IQ is: ${randomIQ}. ${customMessage}`)
}

export default {
  label: 'p:iq',
  name: 'iq',
  value: '> Check your IQ!. Example of use: \n > `p:iq` or `p:iq @Pandy`',
  execute(msg, args) {
    const randomIQ = Math.floor(Math.random() * 200)

    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first()
      RandomMessage(msg, taggedUser, randomIQ)
    } else {
      RandomMessage(msg, '', randomIQ)
    }
  }
}