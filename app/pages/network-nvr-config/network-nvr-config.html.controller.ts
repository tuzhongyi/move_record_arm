import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { NVRConfig } from '../../data-core/models/arm/nvr-config.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { Manager } from '../../data-core/requests/managers/manager'

import { NetworkNVRConfigEvent } from './network-nvr-config.event'

import './network-nvr-config.less'

export class NetworkNVRConfigHtmlController {
  constructor() {
    this.init()
    this.regist()
  }
  private inited = false
  element = {
    IPAddress: document.getElementById('IPAddress') as HTMLInputElement,
    Port: document.getElementById('Port') as HTMLInputElement,

    Username: document.getElementById('Username') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    Connected: document.getElementById('Connected') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,

    save: document.getElementById('save') as HTMLButtonElement,
    test: document.getElementById('test') as HTMLButtonElement,
  }
  event: EventEmitter<NetworkNVRConfigEvent> = new EventEmitter()

  private init() {
    Manager.capability.network
      .then((x) => {
        if (x.NVRProtocolTypes) {
          this.element.ProtocolType.innerHTML = ''
          x.NVRProtocolTypes.forEach((item, index) => {
            let _item: IIdNameModel = {
              Id: item.Value,
              Name: item.Name,
            }
            HtmlTool.select.append(_item, this.element.ProtocolType)
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.Port)
  }

  private _load(data: NVRConfig) {
    this.element.IPAddress.value = HtmlTool.set(data.IPAddress)
    this.element.Port.value = HtmlTool.set(data.Port)
    this.element.Username.value = HtmlTool.set(data.Username)
    this.element.Password.value = HtmlTool.set(data.Password)
    this.element.Connected.value = data.Connected ? '在线' : '离线'
    this.element.ProtocolType.value = HtmlTool.set(data.ProtocolType)
  }

  load(data: NVRConfig) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }

  get(data?: NVRConfig) {
    if (!data) {
      data = new NVRConfig()
    }

    data.IPAddress = HtmlTool.get(this.element.IPAddress.value)
    data.Port = HtmlTool.get(this.element.Port.value, 'number')
    data.Username = HtmlTool.get(this.element.Username.value)
    data.Password = HtmlTool.get(this.element.Password.value)
    data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    return data
  }
}
