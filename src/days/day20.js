import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const goal = 33_100_000
  for (let house = 1; house < 1_000_000; house++) {
    const presents = presentCount(house)
    if (presents >= goal) {
      console.log(`House ${house} got ${presents} presents.`)
      break
    }
  }
}

export async function part2() {
  const goal = 33_100_000
  for (let house = 1; house < Math.floor(goal / 11); house++) {
    const presents = presentCountPart2(house)
    if (presents >= goal) {
      console.log(`House ${house} got ${presents} presents.`)
      break
    }
  }
}

function presentCount(house) {
  let result = 1 + (house > 1 ? house : 0)

  for (let elf = 2; elf <= house / 2; elf++) {
    if (house % elf === 0) result += elf
  }

  return result * 10
}

function presentCountPart2(house) {
  let result = house > 1 ? house : 0

  for (let elf = 1; elf <= house / 2; elf++) {
    if (house % elf === 0 && house / elf <= 50) result += elf
  }

  return result * 11
}
