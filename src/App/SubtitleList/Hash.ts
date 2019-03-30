let index = 0

export const Hash = {
  None: -1,
  create() {
    const hash = index
    index += 1
    return hash
  }
}
