import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { GpsInfo } from '../../data-core/models/arm/gps/gps-info.model'

import './device-gps-info.less'

export class DeviceGpsInfoHtmlController {
  constructor() {}

  element = {
    Longitude: document.getElementById('Longitude') as HTMLInputElement,
    Latitude: document.getElementById('Latitude') as HTMLInputElement,
    GisType: document.getElementById('GisType') as HTMLInputElement,
    State: document.getElementById('State') as HTMLInputElement,
    Course: document.getElementById('Course') as HTMLInputElement,
    Speed: document.getElementById('Speed') as HTMLInputElement,
    SatelliteNumber: document.getElementById(
      'SatelliteNumber'
    ) as HTMLInputElement,
    UpdateTime: document.getElementById('UpdateTime') as HTMLInputElement,
  }

  async load(data: GpsInfo) {
    this.element.Longitude.value = HtmlTool.set(data.Longitude)
    this.element.Latitude.value = HtmlTool.set(data.Latitude)
    this.element.GisType.value = HtmlTool.set(data.GisType)
    this.element.State.value = await EnumTool.GpsState(data.State)
    this.element.Course.value = HtmlTool.set(data.Course)
    this.element.Speed.value = HtmlTool.set(data.Speed)
    this.element.SatelliteNumber.value = HtmlTool.set(data.SatelliteNumber)
    this.element.UpdateTime.value = data.UpdateTime.format(
      'yyyy-MM-dd HH:mm:ss'
    )
  }
}
