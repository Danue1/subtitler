import { TimeRange, createEmptyTimeRange } from './TimeRange'
import { createHash, Hash } from './Hash'
import { Time } from './Time'

interface Prototype {
  readonly setStartsAt: (startsAt: Time) => void
  readonly setEndsAt: (endsAt: Time) => void
  readonly setText: (text: string) => void
  readonly clone: () => Subtitle
}

const prototype: Prototype = {
  setStartsAt(startsAt) {
    const self = this as Subtitle
    self.timeRange.startsAt = startsAt
  },
  setEndsAt(endsAt) {
    const self = this as Subtitle
    self.timeRange.startsAt = endsAt
  },
  setText(text) {
    const self = this as Subtitle
    self.text = text
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
      writable: true,
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
