import { getInput } from '../helpers/getInput.js'
import 'lodash.permutations'
import _ from 'lodash'

const people = ['Alice', 'Bob', 'Carol', 'David', 'Eric', 'Frank', 'George', 'Mallory']

export async function part1() {
  const input = await getInput(13)
  const happinessMap = parseHappiness(input)
  const arrangements = _.permutations(people, people.length)
  console.log(Math.max(...arrangements.map((arrangement) => happiness(arrangement, happinessMap))))
}

export async function part2() {
  const input = await getInput(13)
  const happinessMap = parseHappiness(input)
  const arrangements = _.permutations([...people, 'Me'], people.length + 1)
  const values = arrangements.map((arrangement) => happiness(arrangement, happinessMap))
  console.log(values.reduce((max, value) => (value > max ? value : max)))
}

function parseHappiness(input) {
  const regex =
    /^(?<u1>\w+) would (?<sign>(lose)|(gain)) (?<happiness>\d+) happiness units by sitting next to (?<u2>\w+)/
  return input
    .map((line) => regex.exec(line).groups)
    .reduce(
      (map, { u1, u2, sign, happiness }) => ({ ...map, [`${u1} ${u2}`]: (sign === 'gain' ? 1 : -1) * happiness }),
      {}
    )
}

function happiness(arrangement, happinessMap) {
  let sum = 0
  for (let i = 0; i < arrangement.length; i++) {
    const prevI = (i + arrangement.length - 1) % arrangement.length
    const nextI = (i + 1) % arrangement.length
    sum +=
      (happinessMap[`${arrangement[i]} ${arrangement[prevI]}`] ?? 0) +
      (happinessMap[`${arrangement[i]} ${arrangement[nextI]}`] ?? 0)
  }
  return sum
}
