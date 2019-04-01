export type Hash = number

let index: Hash = 0

export const createHash = (): Hash => (index += 1)
