import { getInput } from '../helpers/getInput.js'

const mfcsam = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

export async function part1() {
  const input = await getInput(16)
  const sues = input.map(parseLine)
  console.log(sues.filter(checkIsMatch1).map(({ name }) => name))
}

export async function part2() {
  const input = await getInput(16)
  const sues = input.map(parseLine)
  console.log(sues.filter(checkIsMatch2).map(({ name }) => name))
}

function parseLine(line) {
  const i = line.indexOf(': ')
  const name = line.substring(0, i)
  const properties = Object.fromEntries(
    line
      .substring(i + 2)
      .split(', ')
      .map((kvp) => kvp.split(': '))
      .map(([property, value]) => [property, +value])
  )
  return { name, properties }
}

const checkIsMatch1 = (sue) => Object.entries(sue.properties).every(([property, value]) => mfcsam[property] === value)
const checkIsMatch2 = (sue) =>
  Object.entries(sue.properties).every(([property, value]) => {
    switch (property) {
      case 'cats':
      case 'trees':
        return mfcsam[property] < value
      case 'pomeranians':
      case 'goldfish':
        return mfcsam[property] > value
      default:
        return mfcsam[property] === value
    }
  })
