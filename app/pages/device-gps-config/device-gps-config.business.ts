import { GpsConfig } from '../../data-core/models/arm/gps/gps-config.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class DeviceGpsConfigBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.gps.config.get()
  }

  update(data: GpsConfig) {
    return this.service.gps.config.update(data)
  }
}
