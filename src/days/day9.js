import { getInput } from '../helpers/getInput.js'
import 'lodash.permutations'
import _ from 'lodash'

const locations = ['Tristram', 'AlphaCentauri', 'Snowdin', 'Tambi', 'Faerun', 'Norrath', 'Straylight', 'Arbre']

export async function part1() {
  const input = await getInput(9)

  const distances = parseDistances(input)

  const routes = _.permutations(locations, locations.length)
  console.log(Math.min(...routes.map((route) => distance(route, distances))))
}

export async function part2() {
  const input = await getInput(9)

  const distances = parseDistances(input)

  const routes = _.permutations(locations, locations.length)
  console.log(Math.max(...routes.map((route) => distance(route, distances))))
}

function parseDistances(input) {
  const regex = /^(?<l1>\w+) to (?<l2>\w+) = (?<distance>\d+)$/
  return input
    .map((line) => regex.exec(line).groups)
    .reduce((map, { l1, l2, distance }) => ({ ...map, [`${l1} ${l2}`]: +distance, [`${l2} ${l1}`]: +distance }), {})
}

function distance(route, distances) {
  let sum = 0
  for (let i = 0; i < route.length - 1; i++) {
    sum += distances[`${route[i]} ${route[i + 1]}`]
  }
  return sum
}
