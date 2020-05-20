const clear = (msg) => {
  return msg.delete()
}

const update = (msg, description) => {
  return msg.edit(description)
}

const reply = (msg, description) => {
  return msg.reply(description)
}

const send = (msg, description) => {
  return msg.channel.send(description)
}

const successResponse = (msg, platform) => {
  return update(msg, `Here's what i found on ${platform}: `)
}

const errorResponse = (msg, params, platform, type) => {
  let passedParams = (type == 'covid' || type == 'sauce') ? params : params.join(' ')
  return send(msg, `Can't found ${passedParams} on ${platform}.`)
}

const failedResponse = (msg, params, platform, type) => {
  let passedParams = (type == 'covid' || type == 'sauce') ? params : params.join(' ')
  return update(msg, `Can't found ${passedParams} on ${platform}.`)
}

const searching = (msg, params, platform, type) => {
  let passedParams = (type == 'covid' || type == 'sauce') ? params : params.join(' ')
  return send(msg, `Searching ${passedParams} on ${platform}...`)
}

const emptyArgument = (msg) => {
  return send(msg, '> Please follow the instructions before use this command! Type `p:help` for help')
}

const nsfwCheck = (msg) => {
  return send(msg, '> This command is only available in NSFW Channel!')
}

export { clear, update, reply, send, successResponse, errorResponse, failedResponse, searching, emptyArgument, nsfwCheck }