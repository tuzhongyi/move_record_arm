import { Transform } from 'class-transformer'
import { IModel } from '../../model.interface'
import { transformDateTime } from '../../transformer'

/**	GpsSignal (GPS卫星信号)	*/
export class GpsSignal implements IModel {
  /**	Int32	卫星编号	M	*/
  No!: number
  /**	Int32	颗卫星的仰角，单位为deg，取值范围为0 ~ 90	O	*/
  Elv?: number
  /**	Int32	颗卫星的方位角，单位为deg，取值范围为0 ~ 359	O	*/
  Az?: number
  /**	Int32	颗卫星的载噪比，单位为dBHz，取值范围为0 ~ 99	O	*/
  Cno?: number
  /**	DateTime	数据更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date
}
