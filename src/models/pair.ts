export type Pair = [string, string]

export const isPair = (tuple: any[]) =>
  tuple.length === 2 &&
  typeof tuple[0] === 'string' &&
  typeof tuple[1] === 'string'
