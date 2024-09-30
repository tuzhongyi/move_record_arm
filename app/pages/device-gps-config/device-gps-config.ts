import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { GpsConfig } from '../../data-core/models/arm/gps/gps-config.model'
import { DeviceGpsConfigBusiness } from './device-gps-config.business'
import { DeviceGpsConfigHtmlController } from './device-gps-config.html.controller'
import { DeviceGpsConfigMessage } from './device-gps-config.message'
import { DeviceGpsConfigWindow } from './device-gps-config.window'

export namespace DeviceGpsConfig {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceGpsConfigHtmlController()
    private business = new DeviceGpsConfigBusiness()
    private message = new DeviceGpsConfigMessage()
    private window = new DeviceGpsConfigWindow()
    private data?: GpsConfig

    private async load() {
      try {
        this.data = await this.business.load()
        this.html.load(this.data)
      } catch (error) {
        MessageBar.error('GPS配置信息读取失败')
      }
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存配置信息?'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.save.bind(this))
    }

    private save() {
      if (this.data) {
        this.data = this.html.get(this.data)
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.load()
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
