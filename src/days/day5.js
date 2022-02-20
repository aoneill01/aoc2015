import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(5)
  const result = input.reduce((count, s) => count + (checkIsNice(s) ? 1 : 0), 0)
  console.log(result)
}

export async function part2() {
  const input = await getInput(5)
  const result = input.reduce((count, s) => count + (checkIsNice2(s) ? 1 : 0), 0)
  console.log(result)
}

function checkIsNice(input) {
  const array = input.split('')
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const disallowed = ['ab', 'cd', 'pq', 'xy']
  const vowelCount = array.reduce((count, letter) => count + (vowels.includes(letter) ? 1 : 0), 0)
  let hasDouble = false
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      hasDouble = true
      break
    }
  }
  const hasDisallowed = disallowed.some((d) => input.includes(d))
  return vowelCount >= 3 && hasDouble && !hasDisallowed
}

function checkIsNice2(input) {
  let hasMatchingPair = false
  let hasSplit = false
  for (let i = 0; i < input.length - 2; i++) {
    if (input.substring(i + 2).includes(input.substring(i, i + 2))) {
      hasMatchingPair = true
    }
    if (input[i] === input[i + 2]) {
      hasSplit = true
    }
  }
  return hasMatchingPair && hasSplit
}
