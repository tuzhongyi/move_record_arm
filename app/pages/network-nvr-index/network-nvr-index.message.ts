import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  NetworkNVRConfigMessageReceiverEvent,
  NetworkNVRConfigMessageSenderEvent,
} from '../network-nvr-config/network-nvr-config.message'

interface MessageReceiverEvent extends NetworkNVRConfigMessageReceiverEvent {}
interface MessageSenderEvent extends NetworkNVRConfigMessageSenderEvent {}

export class NetworkNVRIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: number

  regist() {
    this.proxy.event.on('save_confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (args) => {
      switch (this.command) {
        case 1:
          this.save_result(args)
          break
        default:
          break
      }
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
