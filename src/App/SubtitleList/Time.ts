export class Time {
  public static createEmpty() {
    return Time.create(0, 0, 0, 0)
  }

  public static create(hours: number, minutes: number, seconds: number, microSeconds: number) {
    return new Time(hours, minutes, seconds, microSeconds)
  }

  private constructor(
    public hours: number,
    public minutes: number,
    public seconds: number,
    public microSeconds: number
  ) {}

  public toString() {
    const minutes = this.minutes.toString().padStart(2, '0')
    const seconds = this.seconds.toString().padStart(2, '0')
    const microSeconds = this.microSeconds.toString().padStart(3, '0')
    return `${this.hours}:${minutes}:${seconds}.${microSeconds}`
  }

  public clone() {
    return new Time(this.hours, this.minutes, this.seconds, this.microSeconds)
  }
}
