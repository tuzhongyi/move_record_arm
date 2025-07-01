import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { GpsInfo } from '../../data-core/models/arm/gps/gps-info.model'
import { GpsSignal } from '../../data-core/models/arm/gps/gps-signal.model'
import { IIdNameModel } from '../../data-core/models/model.interface'

import './device-gps-info.less'

export class DeviceGpsInfoHtmlController {
  constructor() {}

  private element = {
    Longitude: document.getElementById('Longitude') as HTMLInputElement,
    Latitude: document.getElementById('Latitude') as HTMLInputElement,
    GisType: document.getElementById('GisType') as HTMLInputElement,
    State: document.getElementById('State') as HTMLInputElement,
    Course: document.getElementById('Course') as HTMLInputElement,
    Speed: document.getElementById('Speed') as HTMLInputElement,

    UpdateTime: document.getElementById('UpdateTime') as HTMLInputElement,

    satellite: {
      number: {
        item: document.getElementById('gps-signal-number') as HTMLDivElement,
        input: document.getElementById('SatelliteNumber') as HTMLInputElement,
      },
      panel: document.getElementById('gps-signal') as HTMLDivElement,
      No: document.getElementById('gps-signal-No') as HTMLSelectElement,
      Elv: document.getElementById('gps-signal-Elv') as HTMLInputElement,
      Az: document.getElementById('gps-signal-Az') as HTMLInputElement,
      Cno: document.getElementById('gps-signal-Cno') as HTMLInputElement,
      UpdateTime: document.getElementById(
        'gps-signal-UpdateTime'
      ) as HTMLInputElement,
    },
  }
  private data?: GpsInfo

  async load(data: GpsInfo) {
    this.data = data
    this.element.Longitude.value = HtmlTool.set(data.Longitude)
    this.element.Latitude.value = HtmlTool.set(data.Latitude)
    this.element.GisType.value = HtmlTool.set(data.GisType)
    this.element.State.value = await EnumTool.GpsState(data.State)
    this.element.Course.value = HtmlTool.set(data.Course)
    this.element.Speed.value = HtmlTool.set(data.Speed)
    this.element.UpdateTime.value = data.UpdateTime.format(
      'yyyy-MM-dd HH:mm:ss'
    )

    if (data.Signals && data.Signals.length > 0) {
      this.element.satellite.number.item.style.display = 'none'
      this.element.satellite.panel.style.display = ''
      data.Signals.forEach((x) => {
        let item = {
          Id: x.No,
          Name: `卫星 ${x.No}`,
        } as IIdNameModel<number>
        HtmlTool.select.append<number>(item, this.element.satellite.No)
      })

      this.element.satellite.No.addEventListener('change', (e) => {
        let target = e.currentTarget as HTMLSelectElement
        if (this.data && this.data.Signals) {
          let item = this.data.Signals.find(
            (x) => x.No.toString() == target.value
          )
          if (item) {
            this.select(item)
          }
        }
      })

      let first = data.Signals[0]
      this.element.satellite.No.value = first.No.toString()
      this.select(first)
    } else {
      this.element.satellite.panel.style.display = 'none'
      this.element.satellite.number.item.style.display = ''
      this.element.satellite.number.input.value = HtmlTool.set(
        data.SatelliteNumber
      )
    }
  }

  select(item: GpsSignal) {
    // this.element.satellite.No.value = HtmlTool.set(item.No)
    this.element.satellite.Elv.value = HtmlTool.set(item.Elv)
    this.element.satellite.Az.value = HtmlTool.set(item.Az)
    this.element.satellite.Cno.value = HtmlTool.set(item.Cno)
    this.element.satellite.UpdateTime.value = item.UpdateTime.format(
      'yyyy-MM-dd HH:mm:ss'
    )
  }
}
