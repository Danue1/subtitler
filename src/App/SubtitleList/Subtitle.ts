import { TimeRange } from './TimeRange'
import { Hash } from './Hash'

export class Subtitle {
  public static createEmpty() {
    return Subtitle.create(TimeRange.createEmpty(), '')
  }

  public static create(timeRange: TimeRange, text: string) {
    return new Subtitle(timeRange, text)
  }

  private constructor(private _timeRange: TimeRange, private _text: string) {}

  private _hash = Hash.create()

  public get hash() {
    return this._hash
  }

  public get text() {
    return this._text
  }

  public get timeRange() {
    return this._timeRange
  }

  public setText(text: string) {
    this._text = text
  }

  public setStartsAt(time: string) {
    // TODO
  }

  public setEndsAt(time: string) {
    // TODO
  }

  public clone() {
    return Subtitle.create(this.timeRange.clone(), this._text)
  }
}
