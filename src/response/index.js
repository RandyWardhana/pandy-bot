const clear = (msg) => {
  return msg.delete()
}

const reply = (msg, description) => {
  return msg.reply(description)
}

const send = (msg, description) => {
  return msg.channel.send(description)
}

export { clear, reply, send }