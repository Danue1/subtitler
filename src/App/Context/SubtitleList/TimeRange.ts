import { Time } from './Time'
import { Clonable } from '../../../types/Clonable'

export class TimeRange implements Clonable<TimeRange> {
  public static create(startsAt: Time, endsAt: Time) {
    return new TimeRange(startsAt, endsAt)
  }

  public static createEmpty() {
    return new TimeRange(Time.createEmpty(true, false), Time.createEmpty(false, true))
  }

  private constructor(public startsAt: Time, public endsAt: Time) {}

  public clone() {
    return new TimeRange(this.startsAt.clone(), this.endsAt.clone())
  }
}
