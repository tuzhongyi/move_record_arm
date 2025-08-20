import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NVRConfig } from '../../data-core/models/arm/nvr-config.model'
import { NetworkNVRConfigBusiness } from './network-nvr-config.business'
import { NetworkNVRConfigHtmlController } from './network-nvr-config.html.controller'
import { NetworkNVRConfigMessage } from './network-nvr-config.message'
import { NetworkNVRConfigWindow } from './network-nvr-config.window'

export namespace NetworkNVRConfig {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new NetworkNVRConfigHtmlController()
    private business = new NetworkNVRConfigBusiness()
    private message = new NetworkNVRConfigMessage()
    private window = new NetworkNVRConfigWindow()

    private data?: NVRConfig

    async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存NVR配置？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
    }

    private onsave() {
      let data = this.html.get(this.data)
      this.business
        .update(data)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }
  }

  const controller = new Controller()
}
