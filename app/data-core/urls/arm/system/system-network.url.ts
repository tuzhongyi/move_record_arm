import { AbstractUrl } from '../../abstract.url'
import { SystemNetworkInterfacesUrl } from './system-network-interface.url'
import { SystemNetworkPlatformAccessUrl } from './system-network-platform-access.url'

export class SystemNetworkUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Network`)
  }
  ssh() {
    return `${this.basic()}/SSH`
  }
  nvr() {
    return `${this.basic()}/NVR`
  }
  capability() {
    return `${this.basic()}/Capability`
  }
  get interface() {
    return new SystemNetworkInterfacesUrl(this.basic())
  }
  get platform() {
    return new SystemNetworkPlatformAccessUrl(this.basic())
  }
}
