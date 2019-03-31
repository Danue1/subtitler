import { TimeRange, createEmptyTimeRange } from './TimeRange'
import { createHash, Hash } from './Hash'
import { Time } from './Time'

interface Prototype {
  readonly setStartsAt: (time: Time) => void
  readonly setEndsAt: (time: Time) => void
  readonly setText: (text: string) => void
  readonly clone: () => Subtitle
}

const prototype: Prototype = {
  setStartsAt(time) {
    // TODO(Danuel)
    const self = this as Subtitle
  },
  setEndsAt(time) {
    // TODO(Danuel)
    const self = this as Subtitle
  },
  setText(text) {
    // TODO(Danuel)
    const self = this as Subtitle
  },
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
      value: ''
    },
    hash: {
      value: createHash()
    }
  })

export const createEmptySubtitle = (): Subtitle => createSubtitle(createEmptyTimeRange())
