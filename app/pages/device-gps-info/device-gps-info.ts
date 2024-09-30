import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { GpsInfo } from '../../data-core/models/arm/gps/gps-info.model'
import { DeviceGpsInfoBusiness } from './device-gps-info.business'
import { DeviceGpsInfoHtmlController } from './device-gps-info.html.controller'

export namespace DeviceGpsInfo {
  class Controller {
    constructor() {
      this.load()
    }
    private html = new DeviceGpsInfoHtmlController()
    private business = new DeviceGpsInfoBusiness()
    private data?: GpsInfo

    private async load() {
      try {
        this.data = await this.business.load()
        this.html.load(this.data)
      } catch (error) {
        MessageBar.error('坐标信息读取失败')
      }
    }
  }

  const controller = new Controller()
}
