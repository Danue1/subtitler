import { TimeRange } from './TimeRange'
import { createHash } from './Hash'
import { Clonable } from '../../../types/Clonable'

export class Subtitle implements Clonable<Subtitle> {
  public static create(timeRange: TimeRange) {
    return new Subtitle(timeRange)
  }

  public static createEmpty() {
    return new Subtitle(TimeRange.createEmpty())
  }

  public text = ''

  public readonly hash = createHash()

  private constructor(public readonly timeRange: TimeRange) {}

  public clone() {
    return new Subtitle(this.timeRange.clone())
  }
}
