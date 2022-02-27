import { getInput } from '../helpers/getInput.js'

const litersOfEggnog = 150

export async function part1() {
  const input = (await getInput(17)).map((v) => +v)
  console.log(containerCombinations(input, litersOfEggnog).length)
}

export async function part2() {
  const input = (await getInput(17)).map((v) => +v)
  const combinations = containerCombinations(input, litersOfEggnog)
  const minContainers = Math.min(...combinations.map((c) => c.length))
  console.log(combinations.filter((c) => c.length === minContainers).length)
}

function containerCombinations(available, goal) {
  if (goal === 0) return [[]]
  if (available.length === 0 || goal < 0) return []

  return [
    ...containerCombinations(available.slice(1), goal - available[0]).map((solution) => [available[0], ...solution]),
    ...containerCombinations(available.slice(1), goal),
  ]
}
