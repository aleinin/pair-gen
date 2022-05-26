import { isPair, Pair } from './pair'

export interface Request {
  teamMembers: string[]
  excludedTeamMembers: string[]
  excludedPairs: Pair[]
}
export const isRequest = (obj: any): obj is Request =>
  obj.teamMembers?.length > 0 &&
  isStringArray(obj.teamMembers) &&
  isStringArray(obj.excludedTeamMembers) &&
  obj.excludedPairs?.every((pair: any) => isPair(pair))

const isStringArray = (array: string[]): array is string[] =>
  array.every((item) => typeof item === 'string')
