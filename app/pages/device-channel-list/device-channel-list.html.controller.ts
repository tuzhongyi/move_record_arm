import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { Manager } from '../../data-core/requests/managers/manager'
import { DeviceChannelListEvent } from './device-channel-list.event'
import { DeviceChannelListHtmlTable } from './device-channel-list.html.table'
import './device-channel-list.less'
export class DeviceChannelListHtmlController {
  private element = {
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      create: document.getElementById('btn_create') as HTMLButtonElement,
      delete: document.getElementById('btn_delete') as HTMLButtonElement,
      discover: document.getElementById('btn_discover') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceChannelListEvent> = new EventEmitter()
  table = new DeviceChannelListHtmlTable()

  constructor() {
    this.init()
    this.regist()
  }

  private inited = false

  init() {
    Manager.capability.inputproxy
      .then((x) => {
        if (!x.Searching) {
          this.element.button.discover.style.display = 'none'
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  regist() {
    this.element.button.create.addEventListener('click', () => {
      this.event.emit('create')
    })
    this.element.button.delete.addEventListener('click', () => {
      if (this.table.selecteds && this.table.selecteds.length > 0) {
        this.event.emit('delete', this.table.selecteds)
      }
    })
    this.element.button.discover.addEventListener('click', () => {
      this.event.emit('discover')
    })
    this.element.search.button.addEventListener('click', () => {
      this.event.emit('search', this.element.search.text.value)
    })
  }
}
