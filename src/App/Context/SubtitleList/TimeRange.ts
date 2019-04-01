import { Time, createEmptyTime } from './Time'
import { Clonable } from '../../../types/Clonable'

type Prototype = Clonable<TimeRange>

const prototype: Prototype = {
  clone() {
    const self = this as TimeRange
    return createTimeRange(self.startsAt.clone(), self.endsAt.clone())
  }
}

export interface TimeRange extends Prototype {
  startsAt: Time
  endsAt: Time
}

export const createTimeRange = (startsAt: Time, endsAt: Time): TimeRange =>
  Object.create(prototype, {
    startsAt: {
      writable: true,
      value: startsAt
    },
    endsAt: {
      writable: true,
      value: endsAt
    }
  })

export const createEmptyTimeRange = (): TimeRange => createTimeRange(createEmptyTime(), createEmptyTime())
