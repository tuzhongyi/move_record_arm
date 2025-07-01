import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	InputProxyCapability (代理输入通道能力)	*/
export class InputProxyCapability
  implements IModel, ICapability<EnumNameValue[] | boolean | undefined>
{
  [key: string]: boolean | EnumNameValue[] | undefined
  /**	Boolean	搜索代理通道是否支持	M	*/
  Searching!: boolean
  /**	EnumValue[]	代理通道状态	O	*/
  ProxyChannelStates?: EnumNameValue[]
  /**	EnumValue[]	设备协议类型	O	*/
  DeviceProtocolTypes?: EnumNameValue[]
  /**	EnumNameValue[]	机位方向	O	R */
  CameraSides?: EnumNameValue[]
}
