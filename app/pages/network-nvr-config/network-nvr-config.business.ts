import { NVRConfig } from '../../data-core/models/arm/nvr-config.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class NetworkNVRConfigBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  async load() {
    return this.service.network.nvr.get()
  }
  update(data: NVRConfig) {
    return this.service.network.nvr.update(data)
  }
}
