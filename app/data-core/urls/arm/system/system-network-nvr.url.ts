import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkNVRUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/NVR`)
  }
}
