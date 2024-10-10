import { IStorage } from './local-storage.model'
import { NavigationAIAnalysisServerStorage } from './navigation-ai-analysis-server.storage'
import { NavigationAIEventStorage } from './navigation-ai-event.storage'
import { NavigationAIModelStorage } from './navigation-ai-model.storage'
import { NavigationDeviceChannelStorage } from './navigation-device-channel.storage'
import { NavigationDeviceGpsStorage } from './navigation-device-gps.storage'
import { NavigationDeviceUsbStorage } from './navigation-device-usb.storage'
import { NavigationNetworkConfigStorage } from './navigation-network-config.storage'
import { NavigationNetworkFrpStorage } from './navigation-network-frp.storage'
import { NavigationNetworkServerStorage } from './navigation-network-server.storage'
import { NavigationRecordConfigStorage } from './navigation-record-config.storage'
import { NavigationRecordFileStorage } from './navigation-record-file.storage'
import { NavigationSystemDeviceStorage } from './navigation-system-device.storage'
import { NavigationSystemIOStorage } from './navigation-system-io.storage'
import { NavigationSystemMaintainStorage } from './navigation-system-maintain.storage'
import { NavigationSystemStatusStorage } from './navigation-system-status.storage'

export class NavigationIndex {
  extend: string = 'system'
  selected: string = 'system_device'
}
export class NavigationStorage implements IStorage<NavigationIndex> {
  key: string = 'navigation'
  get(): NavigationIndex {
    let plain = localStorage.getItem(this.key)
    let index: NavigationIndex
    if (plain) {
      index = JSON.parse(plain)
    } else {
      index = new NavigationIndex()
    }
    return index
  }
  save(v: NavigationIndex): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }
  clear() {
    localStorage.removeItem(this.key)
    let system = this.system as any
    for (const key in system) {
      system[key].clear()
    }
    let network = this.network as any
    for (const key in network) {
      network[key].clear()
    }
    let device = this.device as any
    for (const key in device) {
      device[key].clear()
    }
    let ai = this.ai as any
    for (const key in ai) {
      ai[key].clear()
    }
  }

  system = {
    device: new NavigationSystemDeviceStorage(),
    status: new NavigationSystemStatusStorage(),
    maintain: new NavigationSystemMaintainStorage(),
    io: new NavigationSystemIOStorage(),
  }
  network = {
    config: new NavigationNetworkConfigStorage(),
    server: new NavigationNetworkServerStorage(),
    frp: new NavigationNetworkFrpStorage(),
  }
  device = {
    channel: new NavigationDeviceChannelStorage(),
    usb: new NavigationDeviceUsbStorage(),
    gps: new NavigationDeviceGpsStorage(),
  }
  ai = {
    model: new NavigationAIModelStorage(),
    event: new NavigationAIEventStorage(),
    server: new NavigationAIAnalysisServerStorage(),
  }
  record = {
    config: new NavigationRecordConfigStorage(),
    file: new NavigationRecordFileStorage(),
  }
}
