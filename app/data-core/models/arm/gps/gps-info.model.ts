import { Transform, Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { transformDateTime } from '../../transformer'
import { GpsSignal } from './gps-signal.model'

/**	GpsInfo (GPS信息)	*/
export class GpsInfo implements IModel {
  /**	Double	经度，东经正数，西经负数	O	*/
  Longitude?: number
  /**	Double	纬度，北纬正数，南纬负数	O	*/
  Latitude?: number
  /**	String	目前只有WGS84一种情况	O	*/
  GisType?: string
  /**	String	GPS设备状态	M	*/
  State!: string
  /**	Double	地面航向，真北方向顺时针0-359.999，目前不支持	O	*/
  Course?: number
  /**	Double	航行速度，单位km/h或节	O	*/
  Speed?: number
  /**	Int32	卫星数量，0表示没有卫星	O	*/
  SatelliteNumber?: number
  /**	DateTime	数据更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date
  /**	Double	加速度计X轴加速度，单位为m/s2	O	R */
  AccX?: number
  /**	Double	加速度计Y轴加速度，单位为m/s2	O	R */
  AccY?: number
  /**	GpsSignal[]	卫星信号强度，格式：编号1:强度1，编号2:强度2	O	R */
  @Type(() => GpsSignal)
  Signals?: GpsSignal[]
}
