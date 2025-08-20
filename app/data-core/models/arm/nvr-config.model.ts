import { IModel } from '../model.interface'

/**	NVRConfig	(NVR设备配置信息)	*/
export class NVRConfig implements IModel {
  /**	String	设备IP地址	M	*/
  IPAddress!: string
  /**	Int32	端口号	M	*/
  Port!: number
  /**	String	用户名	O	*/
  Username?: string
  /**	String	密码	O	*/
  Password?: string
  /**	String	协议类型	O	*/
  ProtocolType?: string
  /**	Boolean	是否成功连接，True：在线，False：离线	O	*/
  Connected?: boolean
}
