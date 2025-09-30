import { UploadFile } from './upload-control.model'

export interface UploadControlEventArgs {
  upload: (args: UploadFile) => void
}
