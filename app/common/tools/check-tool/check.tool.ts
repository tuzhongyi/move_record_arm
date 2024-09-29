import { NTPTimeMode } from '../../../data-core/enums/ntp-time-mode.enum'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { SystemTime } from '../../../data-core/models/arm/system-time.model'
import { ResultArgs } from '../../../pages/main/main.event'

export class CheckTool {
  static SystemTime(data: SystemTime): ResultArgs {
    if (!data.TimeMode) {
      return {
        result: false,
        message: '时间模式为空',
        inner: true,
      }
    }
    if (!data.LocalTime) {
      return {
        result: false,
        message: '本地时间为空',
        inner: true,
      }
    }
    if (data.TimeMode === NTPTimeMode.NTP) {
      if (!data.NTPServer) {
        return {
          result: false,
          message: 'NTP服务为空',
          inner: true,
        }
      }
      if (!data.NTPServer.HostAddress) {
        return {
          result: false,
          message: '请填写NTP服务地址',
          inner: true,
        }
      }
      if (data.NTPServer.PortNo >= 0) {
        return {
          result: false,
          message: '请填写服务器端口号',
          inner: true,
        }
      }
      if (data.NTPServer.SynchronizeInterval > 0) {
        return {
          result: false,
          message: '请填写校时时间间隔',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }

  static InputProxyChannel(data: InputProxyChannel): ResultArgs {
    if (!data.Name) {
      return {
        result: false,
        message: '请输入通道名称',
        inner: true,
      }
    }
    if (!data.SourceChannel.HostAddress) {
      return {
        result: false,
        message: '请输入设备IP地址',
        inner: true,
      }
    }
    if (!data.SourceChannel) {
      return {
        result: false,
        message: '数据来源为空',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.PortNo)) {
      return {
        result: false,
        message: '请输入设备端口号',
        inner: true,
      }
    }
    if (data.SourceChannel.PortNo < 0 || 65535 < data.SourceChannel.PortNo) {
      return {
        result: false,
        message: '设备端口号范围为0-65535',
        inner: true,
      }
    }
    if (!data.SourceChannel.ProtocolType) {
      return {
        result: false,
        message: '请选择协议类型',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.ChannelNo)) {
      return {
        result: false,
        message: '请输入设备视频通道编号',
        inner: true,
      }
    }

    if (data.PositionNo) {
      if (data.PositionNo < 1 || 30 < data.PositionNo) {
        return {
          result: false,
          message: '摄像机机位编号范围为1-30',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }
}
