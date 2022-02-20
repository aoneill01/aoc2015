import { getInput } from '../helpers/getInput.js'

const delta = {
  '(': 1,
  ')': -1,
}

export async function part1() {
  const input = (await getInput(1))[0]
  const result = input.split('').reduce((floor, direction) => floor + delta[direction], 0)
  console.log(result)
}

export async function part2() {
  const input = (await getInput(1))[0]
  let floor = 0
  for (let i = 0; i < input.length; i++) {
    floor += delta[input[i]]
    if (floor < 0) {
      console.log(i + 1)
      break
    }
  }
}
