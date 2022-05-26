import shuffle from 'lodash.shuffle'
import difference from 'lodash.difference'
import { TimeOutException } from './TimeOutException'

const FIVE_HUNDRED_MILLISECONDS = 500

interface ExternalData {
  teamMembers: string[]
  excludedTeamMembers: string[]
  excludedPairs: Pair[]
}
const external: ExternalData = {
  teamMembers: [
    'Jared',
    'Eric',
    'Andrew',
    'Emily',
    'Thanh',
    'Satish',
    'Martin',
    'John',
  ],
  excludedTeamMembers: ['Andrew'],
  excludedPairs: [['Jared', 'John']],
}

type Pair = [string, string]

export const generatePairs = (
  teamMembers: string[],
  excludedTeamMembers: string[],
  excludedPairs: Pair[]
): Pair[] => {
  let teamMembersToPair = teamMembers.filter(
    (teamMember) => !excludedTeamMembers.includes(teamMember)
  )
  const pairs: Pair[] = getRandomPairs(
    shuffle(teamMembersToPair),
    excludedPairs
  )
  return pairs
}

const getRandomPairs = (
  teamMembersToPair: string[],
  excludedPairs: Pair[]
): Pair[] => {
  const startTime = Date.now()
  let pairs = []
  while (teamMembersToPair.length > 0) {
    if (Date.now() - startTime > FIVE_HUNDRED_MILLISECONDS) {
      throw new TimeOutException()
    }
    if (teamMembersToPair.length === 1) {
      pairs.push([teamMembersToPair[0], ''] as Pair)
      break
    }
    const potentialPair: Pair = [teamMembersToPair[0], teamMembersToPair[1]]
    const isExcludedPair = excludedPairs.some(
      (excludedPair) => difference(excludedPair, potentialPair).length === 0
    )
    if (isExcludedPair) {
      teamMembersToPair = shuffle(teamMembersToPair)
    } else {
      pairs.push(potentialPair)
      teamMembersToPair = [...teamMembersToPair.slice(2)]
    }
  }
  return pairs
}

generatePairs(
  external.teamMembers,
  external.excludedTeamMembers,
  external.excludedPairs
)
