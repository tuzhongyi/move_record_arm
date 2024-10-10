import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { UsbDeviceInfo } from '../../data-core/models/arm/usb/usb-device-Info.model'

declare const $: any
export class DeviceUsbInfoHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement

  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement
  thead = document.querySelector('#table thead') as HTMLTableSectionElement

  private widths = [
    '50px',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    '100px',
    'auto',
  ]

  private datas: UsbDeviceInfo[] = []
  private _sort?: Sort

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.sort(sort)
    })
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction === 'asc'
      )
    })
    this.reload()
  }

  private append(index: number, item: UsbDeviceInfo) {
    HtmlTool.table.append(this.tbody, [
      (index + 1).toString(),
      HtmlTool.set(item.Name, '-'),
      HtmlTool.set(item.Label, '-'),
      HtmlTool.set(item.DevPath, '-'),
      HtmlTool.set(item.MountPath, '-'),
      HtmlTool.set(item.TotalSize, '-'),
      HtmlTool.set(item.AvailableSize, '-'),
      HtmlTool.set(item.FileSystemType, '-'),
      Language.YesOrNo(item.Mounted),
      item.UpdateTime ? item.UpdateTime.format('yyyy-MM-dd HH:mm:ss') : '-',
    ])
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  reload() {
    this.clear()
    for (let i = 0; i < this.datas.length; i++) {
      this.append(i, this.datas[i])
    }
  }

  async load(datas: UsbDeviceInfo[]) {
    this.datas = datas
    for (let i = 0; i < this.datas.length; i++) {
      this.append(i, this.datas[i])
    }

    if (this._sort) {
      this.sort(this._sort)
    }
  }
}
