import { reply } from '../response'

export default {
  label: 'p:spoiler',
  name: 'spoiler',
  value: '> Spoiler your responses. Example of use:\n > `p:spoiler Woah cool, now go spoiler`',
  execute(msg, args) {
    reply(msg, `||${args.join(' ')}||`)
  }
}