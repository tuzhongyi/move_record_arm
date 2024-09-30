import '../../../assets/styles/table-sticky.less'
import { DeviceUsbInfoHtmlTable } from './device-usb-info.html.table'
import './device-usb-info.less'
export class DeviceUsbInfoHtmlController {
  constructor() {
    this.init()
  }

  element = {
    table: new DeviceUsbInfoHtmlTable(),
  }
  //   <colgroup>
  //   <col [ngStyle]="{ width: width }" *ngFor="let width of widths" />
  // </colgroup>
  init() {}
}
