import { plainToInstance } from 'class-transformer'
import { FileInfo } from '../../../../models/arm/file/file-info.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'

export class SystemFileRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array() {
    let url = ArmSystemUrl.file.basic()
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url)
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data)
    }
    throw new Error(response.FaultReason)
  }

  async folder(path: string) {
    let url = ArmSystemUrl.file.path(path)
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url)
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data)
    }
    throw new Error(response.FaultReason)
  }
  async file(path: string) {
    let url = ArmSystemUrl.file.path(path)
    return this.http.get<any>(url)
  }
  path(path: string) {
    return ArmSystemUrl.file.path(path)
  }
}
