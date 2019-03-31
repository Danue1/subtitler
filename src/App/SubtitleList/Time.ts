interface Prototype {
  readonly clone: () => Time
  readonly toString: () => string
}

const prototype: Prototype = {
  clone() {
    const self = this as Time
    return createTime(self.hours, self.minutes, self.seconds, self.microSeconds)
  },
  toString() {
    const self = this as Time
    const minutes = self.minutes.toString().padStart(2, '0')
    const seconds = self.seconds.toString().padStart(2, '0')
    const microSeconds = self.microSeconds.toString().padStart(3, '0')
    return `${self.hours}:${minutes}:${seconds}.${microSeconds}`
  }
}

export interface Time extends Prototype {
  hours: number
  minutes: number
  seconds: number
  microSeconds: number
}

export const createTime = (hours: number, minutes: number, seconds: number, microSeconds: number): Time =>
  Object.create(prototype, {
    hours: {
      value: hours
    },
    minutes: {
      value: minutes
    },
    seconds: {
      value: seconds
    },
    microSeconds: {
      value: microSeconds
    }
  })

export const createEmptyTime = (): Time => createTime(0, 0, 0, 0)
