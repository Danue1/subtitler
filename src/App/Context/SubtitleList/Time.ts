import { TimeAdder } from './TimeAdder'
import { Clonable } from '../../../types/Clonable'

export class Time implements Clonable<Time> {
  public static create(
    hours: number,
    minutes: number,
    seconds: number,
    milliSeconds: number,
    isStart: boolean,
    isEnd: boolean
  ) {
    return new Time(hours, minutes, seconds, milliSeconds, isStart, isEnd)
  }

  public static createEmpty(isStart: boolean, isEnd: boolean) {
    return new Time(0, 0, 0, 0, isStart, isEnd)
  }

  public readonly adder: TimeAdder

  private constructor(
    hours: number,
    minutes: number,
    seconds: number,
    milliSeconds: number,
    public isStart: boolean,
    public isEnd: boolean
  ) {
    this.adder = TimeAdder.create(hours, minutes, seconds, milliSeconds)
  }

  public get time() {
    return this.adder.timestamp
  }
  public get hours() {
    return this.adder.hours
  }
  public get minutes() {
    return this.adder.minutes
  }
  public get seconds() {
    return this.adder.seconds
  }
  public get milliSeconds() {
    return this.adder.milliSeconds
  }

  public isEqual(time: Time) {
    return time.adder.timestamp === this.adder.timestamp
  }
  public isLower(time: Time) {
    return time.adder.timestamp < this.adder.timestamp
  }
  public isHigher(time: Time) {
    return time.adder.timestamp > this.adder.timestamp
  }

  min(time: Time) {
    const minTime = this.isLower(time) ? time : this
    return minTime.clone()
  }
  max(time: Time) {
    const minTime = this.isHigher(time) ? time : this
    return minTime.clone()
  }

  addHours(hours: number) {
    this.adder.hours += hours
  }
  addMinutes(minutes: number) {
    this.adder.minutes += minutes
  }
  addSeconds(seconds: number) {
    this.adder.seconds += seconds
  }
  addMilliSeconds(milliSeconds: number) {
    this.adder.milliSeconds += milliSeconds
  }
  add(hours: number, minutes: number, seconds: number, milliSeconds: number) {
    this.adder.add(hours, minutes, seconds, milliSeconds)
  }

  setStart(isStart: boolean) {
    this.isStart = isStart
  }
  setEnd(isEnd: boolean) {
    this.isEnd = isEnd
  }

  clone() {
    return new Time(this.hours, this.minutes, this.seconds, this.milliSeconds, false, false)
  }

  toString() {
    const hours = this.hours.toString().padStart(2, '0')
    const minutes = this.minutes.toString().padStart(2, '0')
    const seconds = this.seconds.toString().padStart(2, '0')
    const milliSeconds = this.milliSeconds.toString().padStart(3, '0')
    return `${hours}:${minutes}:${seconds}.${milliSeconds}`
  }
}
