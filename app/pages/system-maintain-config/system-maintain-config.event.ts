import { UploadFile } from '../../common/tools/controls/upload-control/upload-control.model'
import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'

export interface SystemMaintainConfigEvent {
  reboot(): void
  shutdown(): void
  factoryreset(mode: FactoryResetMode): void
  configdownload(): void

  configupload(file: UploadFile): void
  upgradeupload(file: UploadFile): void
}
