import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { GpsConfig } from '../../data-core/models/arm/gps/gps-config.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { Manager } from '../../data-core/requests/managers/manager'
import { DeviceGpsConfigEvent } from './device-gps-config.event'

import './device-gps-config.less'

export class DeviceGpsConfigHtmlController {
  event: EventEmitter<DeviceGpsConfigEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    SimpleFrequency: document.getElementById(
      'SimpleFrequency'
    ) as HTMLSelectElement,
    SimpleRate: document.getElementById('SimpleRate') as HTMLSelectElement,

    save: document.getElementById('save') as HTMLButtonElement,
  }
  private inited = false

  private init() {
    Manager.capability.gps
      .then((x) => {
        if (x.SimpleFrequencies) {
          for (let i = 0; i < x.SimpleFrequencies.length; i++) {
            let item: IIdNameModel = {
              Id: x.SimpleFrequencies[i].Value,
              Name: x.SimpleFrequencies[i].Name,
            }
            HtmlTool.select.append(item, this.element.SimpleFrequency)
          }
        }
        if (x.SimpleRates) {
          for (let i = 0; i < x.SimpleRates.length; i++) {
            let item: IIdNameModel = {
              Id: x.SimpleRates[i].Value,
              Name: x.SimpleRates[i].Name,
            }
            HtmlTool.select.append(item, this.element.SimpleRate)
          }
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
  }

  get(data?: GpsConfig) {
    if (!data) {
      data = new GpsConfig()
    }
    data.SimpleFrequency = HtmlTool.get(
      this.element.SimpleFrequency.value,
      'number'
    )
    data.SimpleRate = HtmlTool.get(this.element.SimpleRate.value, 'number')
    return data
  }

  private _load(data: GpsConfig) {
    this.element.SimpleFrequency.value = HtmlTool.set(data.SimpleFrequency)
    this.element.SimpleRate.value = HtmlTool.set(data.SimpleRate)
  }

  load(data: GpsConfig) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }
}
