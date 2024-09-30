import { DeviceUsbInfoBusiness } from './device-usb-info.business'
import { DeviceUsbInfoHtmlController } from './device-usb-info.html.controller'

export namespace DeviceUsbInfo {
  class Controller {
    constructor() {
      this.load()
    }
    private html = new DeviceUsbInfoHtmlController()
    private business = new DeviceUsbInfoBusiness()
    private load() {
      this.loading()
      setTimeout(() => {
        this.load()
      }, 1000 * 5)
    }

    private loading() {
      return this.business.load().then((datas) => {
        this.html.element.table.clear()
        this.html.element.table.load(datas)
      })
    }
  }

  let controller = new Controller()
}
