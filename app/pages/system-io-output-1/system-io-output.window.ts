import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export class SystemIOOutputWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.data = undefined
    this.message = ''
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  args: any
  data?: {
    port: IOOutputPort
  }
}
