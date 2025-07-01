import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { SystemIOOutputBusiness } from './system-io-output.business'
import { SystemIOOutputHtmlController } from './system-io-output.html.controller'
import { SystemIOOutputMessage } from './system-io-output.message'
import { SystemIOOutputWindow } from './system-io-output.window'

export namespace SystemIOOutput {
  class WorkSheetController {
    constructor(
      private html: SystemIOOutputHtmlController,
      private business: SystemIOOutputBusiness
    ) {
      this.regist()
    }

    private regist() {
      this.html.event.on('select', this.onselect.bind(this))
    }

    load(source: IOOutputPort) {}

    private onselect(data: IOOutputPort) {
      this.load(data)
    }
  }

  class PortController {
    constructor(
      private html: SystemIOOutputHtmlController,
      private business: SystemIOOutputBusiness
    ) {
      this.regist()
      this.init()
    }

    datas: IOOutputPort[] = []

    private clear() {
      this.html.clear()
    }

    private async init() {
      this.datas = await this.business.load()
      this.html.init(this.datas)
    }

    private load(data: IOOutputPort) {
      this.html.load(data)
    }

    set(data: IOOutputPort) {
      this.html.set(data)
    }

    private regist() {
      this.html.event.on('select', this.onselect.bind(this))
    }

    private onselect(data: IOOutputPort) {
      this.load(data)
    }
  }

  class Controller {
    private html = new SystemIOOutputHtmlController()
    private business = new SystemIOOutputBusiness()
    private message = new SystemIOOutputMessage()
    private window = new SystemIOOutputWindow()
    constructor() {
      this.regist()
    }

    private port = new PortController(this.html, this.business)
    private sheet = new WorkSheetController(this.html, this.business)

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.message.event.on('save', this.tosave.bind(this))
    }

    onsave(data: IOOutputPort) {
      this.window.confirm.message = '是否保存事件部署信息?'
      this.window.confirm.data = {
        port: data,
      }
      this.message.save_confirm(this.window.confirm)
    }

    tosave() {
      if (this.window.confirm.data) {
        this.business
          .update(this.window.confirm.data.port)
          .then((x) => {
            MessageBar.success('保存成功')
            this.port.set(x)
          })
          .catch(() => {
            MessageBar.error('保存失败')
          })
          .finally(() => {
            this.window.confirm.clear()
          })
      }
    }
  }

  const controller = new Controller()
}
