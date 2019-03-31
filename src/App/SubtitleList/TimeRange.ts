import { Time, createEmptyTime } from './Time'

interface Prototype {
  readonly clone: () => TimeRange
}

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
      value: startsAt
    },
    endsAt: {
      value: endsAt
    }
  })

export const createEmptyTimeRange = (): TimeRange => createTimeRange(createEmptyTime(), createEmptyTime())
