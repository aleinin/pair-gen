import difference from 'lodash.difference'

const factorial = (num: number): number => {
  if (num > 20 || num < 0) {
    return -1
  }
  if (num === 0) {
    return 1
  }
  return num * factorial(num - 1)
}

export const combinations = (numberOfItems: number, sizeOfSample: number) => {
  if (sizeOfSample > numberOfItems) {
    return -1
  }
  /*
  n = numberOfItems
  r = sizeOfSample
  C(n, r) = n! / (r!(n-r)!)
  */
  const numerator = factorial(numberOfItems)
  const denominator =
    factorial(sizeOfSample) * factorial(numberOfItems - sizeOfSample)
  return numerator / denominator
}

const isCombinatoriallyEquivalent = (
  comboOne: string[],
  comboTwo: string[]
): boolean => difference(comboOne, comboTwo).length === 0

export const isValidCombinations = (combinations: string[][]): boolean => {
  let index = 0
  while (index < combinations.length) {
    const combo = combinations[index]
    const combosToCheck = combinations.slice(index + 1)
    const hasDuplicate = combosToCheck.some((comboToCheck) =>
      isCombinatoriallyEquivalent(comboToCheck, combo)
    )
    if (hasDuplicate) {
      return false
    }
    index++
  }
  return true
}
