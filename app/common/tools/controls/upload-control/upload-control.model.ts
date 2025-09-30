export enum FileReadType {
  ArrayBuffer,
  BinaryString,
  DataURL,
  Text,
}
export type FileResult = string | ArrayBuffer | null

export interface UploadFile {
  result: FileResult
  filename: string
}
