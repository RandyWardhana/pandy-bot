import { send } from '../response'
import { mockify } from '../util/mocking'

export default {
  label: 'p:mock',
  name: 'mock',
  value: '> Mocking someone. Example of use: \n > `p:mock sorry i\'\m busy` or `p:mock sorry i\'\m busy @Pandy`',
  execute(msg, args) {
    send(msg, mockify(args.join(' ')))
  }
}