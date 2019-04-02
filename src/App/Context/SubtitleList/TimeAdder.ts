import { Clonable } from '../../../types/Clonable'

const oneDay = 24 * 60 * 60 * 1000

const date = new Date(0)

export class TimeAdder implements Clonable<TimeAdder> {
  public static parse(value: string) {
    const hours = Number.parseInt(value.slice(0, 2))
    const minutes = Number.parseInt(value.slice(3, 5))
    const seconds = Number.parseInt(value.slice(6, 8))
    const milliSeconds = Number.parseInt(value.slice(9, 12))
    return new TimeAdder(hours, minutes, seconds, milliSeconds)
  }

  public static create(hours: number, minutes: number, seconds: number, milliSeconds: number) {
    return new TimeAdder(hours, minutes, seconds, milliSeconds)
  }

  public static createEmpty() {
    return new TimeAdder(0, 0, 0, 0)
  }

  private _time = 0
  private _hours = 0
  private _minutes = 0
  private _seconds = 0
  private _milliSeconds = 0

  private constructor(hours: number, minutes: number, seconds: number, milliSeconds: number) {
    this.add(hours, minutes, seconds, milliSeconds)
  }

  public get hours() {
    return this._hours
  }
  public get minutes() {
    return this._minutes
  }
  public get seconds() {
    return this._seconds
  }
  public get milliSeconds() {
    return this._milliSeconds
  }

  public set hours(hours: number) {
    this.prepare(date => date.setUTCHours(hours))
  }
  public set minutes(minutes: number) {
    this.prepare(date => date.setUTCMinutes(minutes))
  }
  public set seconds(seconds: number) {
    this.prepare(date => date.setUTCSeconds(seconds))
  }
  public set milliSeconds(milliSeconds: number) {
    this.prepare(date => date.setUTCMilliseconds(milliSeconds))
  }
  public add(hours: number, minutes: number, seconds: number, milliSeconds: number) {
    date.setUTCHours(this.hours + hours)
    date.setUTCMinutes(this.minutes + minutes)
    date.setUTCSeconds(this.seconds + seconds)
    date.setUTCMilliseconds(this.milliSeconds + milliSeconds)
    this.reCache()
  }

  private prepare(handler: (date: Date) => void) {
    date.setTime(this._time)
    handler(date)
    this.reCache()
  }

  private reCache() {
    const time = (oneDay + date.getTime()) % oneDay
    date.setTime(time)

    this._time = time
    this._hours = date.getUTCHours()
    this._minutes = date.getUTCMinutes()
    this._seconds = date.getUTCSeconds()
    this._milliSeconds = date.getUTCMilliseconds()
  }

  public clone() {
    return new TimeAdder(this.hours, this.minutes, this.seconds, this.milliSeconds)
  }
}
