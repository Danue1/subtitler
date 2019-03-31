interface Prototype {
  readonly add: (hours: number, minutes: number, seconds: number, milliSeconds: number) => void
  readonly clone: () => TimeAdder
}

const prototype: Prototype = {
  add(hours, minutes, seconds, milliSeconds) {
    const self = this as TimeAdder

    const sumMilliSeconds = self.milliSeconds + milliSeconds
    const nextMilliSeconds = sumMilliSeconds % 1000
    const secondCarry = (sumMilliSeconds - nextMilliSeconds) / 1000

    const sumSeconds = self.seconds + seconds + secondCarry
    const nextSeconds = sumSeconds % 60
    const minuteCarry = (sumSeconds - nextSeconds) / 60

    const sumMinutes = self.minutes + minutes + minuteCarry
    const nextMinutes = sumMinutes % 60
    const hourCarry = (sumMinutes - nextMinutes) / 60

    const sumHours = self.hours + hours + hourCarry
    const nextHours = sumHours % 24

    self.milliSeconds = nextMilliSeconds
    self.seconds = nextSeconds
    self.minutes = nextMinutes
    self.hours = nextHours
  },
  clone() {
    const self = this as TimeAdder
    return createTimeAdder(self.hours, self.minutes, self.seconds, self.milliSeconds)
  }
}

export interface TimeAdder extends Prototype {
  hours: number
  minutes: number
  seconds: number
  milliSeconds: number
}

export const createTimeAdder = (hours: number, minutes: number, seconds: number, milliSeconds: number): TimeAdder =>
  Object.create(prototype, {
    hours: {
      value: hours,
      writable: true
    },
    minutes: {
      value: minutes,
      writable: true
    },
    seconds: {
      value: seconds,
      writable: true
    },
    milliSeconds: {
      value: milliSeconds,
      writable: true
    }
  })
