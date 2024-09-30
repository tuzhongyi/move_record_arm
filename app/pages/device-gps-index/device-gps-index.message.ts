import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceGpsConfigMessageReceiverEvent,
  DeviceGpsConfigMessageSenderEvent,
} from '../device-gps-config/device-gps-config.message'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageReceiverEvent extends DeviceGpsConfigMessageReceiverEvent {}
interface MessageSenderEvent extends DeviceGpsConfigMessageSenderEvent {}

export class DeviceGpsIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  regist() {
    this.proxy.event.on('save_confirm', (args) => {
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (args) => {
      this.save_result(args)
    })
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }
}
