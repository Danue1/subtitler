import { Time } from './Time'

export class TimeRange {
  public static createEmpty() {
    return TimeRange.create(Time.createEmpty(), Time.createEmpty())
  }

  public static create(startsAt: Time, endsAt: Time) {
    return new TimeRange(startsAt, endsAt)
  }

  private constructor(private _startsAt: Time, private _endsAt: Time) {}

  public get startsAt() {
    return this._startsAt
  }

  public get endsAt() {
    return this._endsAt
  }

  public clone() {
    return new TimeRange(this._startsAt.clone(), this._endsAt.clone())
  }
}
