import { TimeRange } from './TimeRange'
import { createHash, Hash } from './Hash'
import { Clonable } from '../../../types/Clonable'

export class Subtitle implements Clonable<Subtitle> {
  public static create(timeRange: TimeRange) {
    return new Subtitle(timeRange, '', createHash())
  }

  public static createEmpty() {
    return new Subtitle(TimeRange.createEmpty(), '', createHash())
  }

  private constructor(public readonly timeRange: TimeRange, public text: string, public readonly hash: Hash) {}

  public clone() {
    return new Subtitle(this.timeRange.clone(), this.text, this.hash)
  }
}
