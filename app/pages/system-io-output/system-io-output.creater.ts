import { TimeSegment } from '../../data-core/models/arm/time-segment.model'
import { Time } from '../../data-core/models/common/time.model'

export class SystemIOOutputCreater {
  static TimeSegment(
    start: Time = new Time(8, 0, 0),
    stop: Time = new Time(20, 0, 0)
  ) {
    let data = new TimeSegment()
    data.StartTime = start
    data.StopTime = stop
    return data
  }
}
