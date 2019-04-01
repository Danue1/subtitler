import { TimeAdder, createTimeAdder } from './TimeAdder'
import { Clonable } from '../../../types/Clonable'

interface Prototype extends Clonable<Time> {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly milliSeconds: number

  readonly isEqual: (time: Time) => boolean
  readonly isLower: (time: Time) => boolean
  readonly isHigher: (time: Time) => boolean

  readonly min: (time: Time) => Time
  readonly max: (time: Time) => Time

  readonly addHours: (hours: number) => void
  readonly addMinutes: (minutes: number) => void
  readonly addSeconds: (seconds: number) => void
  readonly addMilliSeconds: (milliSeconds: number) => void

  readonly toString: () => string
  readonly valueOf: () => string
}

const prototype: Prototype = {
  get hours() {
    const self = this as Time
    return self.adder.hours
  },
  get minutes() {
    const self = this as Time
    return self.adder.minutes
  },
  get seconds() {
    const self = this as Time
    return self.adder.seconds
  },
  get milliSeconds() {
    const self = this as Time
    return self.adder.milliSeconds
  },
  isEqual(time) {
    return time.valueOf() === this.valueOf()
  },
  isLower(time) {
    return time.valueOf() < this.valueOf()
  },
  isHigher(time) {
    return time.valueOf() > this.valueOf()
  },
  min(time) {
    const minTime = this.isLower(time) ? time : this
    return minTime.clone()
  },
  max(time) {
    const minTime = this.isHigher(time) ? time : this
    return minTime.clone()
  },
  addHours(hours) {
    const self = this as Time
    self.adder.add(hours, 0, 0, 0)
  },
  addMinutes(minutes) {
    const self = this as Time
    self.adder.add(0, minutes, 0, 0)
  },
  addSeconds(seconds) {
    const self = this as Time
    self.adder.add(0, 0, seconds, 0)
  },
  addMilliSeconds(milliSeconds) {
    const self = this as Time
    self.adder.add(0, 0, 0, milliSeconds)
  },
  clone() {
    const self = this as Time
    return createTime(self.hours, self.minutes, self.seconds, self.milliSeconds)
  },
  toString() {
    const self = this as Time
    const minutes = self.minutes.toString().padStart(2, '0')
    const seconds = self.seconds.toString().padStart(2, '0')
    const milliSeconds = self.milliSeconds.toString().padStart(3, '0')
    return `${self.hours}:${minutes}:${seconds}.${milliSeconds}`
  },
  valueOf() {
    const self = this as Time
    const hours = self.hours.toString().padStart(2, '0')
    const minutes = self.minutes.toString().padStart(2, '0')
    const seconds = self.seconds.toString().padStart(2, '0')
    const milliSeconds = self.milliSeconds.toString().padStart(3, '0')
    return hours + minutes + seconds + milliSeconds
  }
}

export interface Time extends Prototype {
  readonly adder: TimeAdder
}

export const createTime = (hours: number, minutes: number, seconds: number, milliSeconds: number): Time =>
  Object.create(prototype, {
    adder: {
      value: createTimeAdder(hours, minutes, seconds, milliSeconds)
    }
  })

export const createEmptyTime = (): Time => createTime(0, 0, 0, 0)
