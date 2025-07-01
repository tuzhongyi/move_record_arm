import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'

export interface SystemIOOutputEvent {
  select(index: IOOutputPort): void
  save(data: IOOutputPort): void
  manual(data: IOOutputPort): void
}
