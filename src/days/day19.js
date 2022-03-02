import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const { replacements, molecule } = await parseInput()
  const set = new Set()
  for (const replacement of replacements) {
    moleculesForReplacement(replacement, molecule).forEach((m) => set.add(m))
  }
  console.log(set.size)
}

export async function part2() {
  // const input = await getInput(19)
}

async function parseInput() {
  const replacements = []

  const input = await getInput(19)

  let i = 0
  while (input[i] !== '') {
    replacements.push(input[i].split(' => '))
    i++
  }

  i++
  return { replacements, molecule: input[i] }
}

function moleculesForReplacement([input, output], molecule) {
  const results = []
  let startIndex = 0
  let i

  while ((i = molecule.indexOf(input, startIndex)) !== -1) {
    results.push(molecule.substring(0, i) + output + molecule.substring(i + input.length))
    startIndex = i + 1
  }

  return results
}
