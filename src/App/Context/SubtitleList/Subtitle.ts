import { TimeRange, createEmptyTimeRange } from './TimeRange'
import { createHash, Hash } from './Hash'
import { Clonable } from '../../../types/Clonable'

type Prototype = Clonable<Subtitle>

const prototype: Prototype = {
  clone() {
    const self = this as Subtitle
    return createSubtitle(self.timeRange.clone())
  }
}

export interface Subtitle extends Prototype {
  text: string

  readonly timeRange: TimeRange
  readonly hash: Hash
}

export const createSubtitle = (timeRange: TimeRange): Subtitle =>
  Object.create(prototype, {
    timeRange: {
      value: timeRange
    },
    text: {
      writable: true,
      value: ''
    },
    hash: {
      value: createHash()
    }
  })

export const createEmptySubtitle = (): Subtitle => createSubtitle(createEmptyTimeRange())
