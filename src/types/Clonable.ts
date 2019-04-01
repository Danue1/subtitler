export type Clonable<T> = {
  readonly clone: () => T
}
