import { getInput } from '../helpers/getInput.js'

export async function part1() {
  let current = '1321131112'
  for (let i = 0; i < 40; i++) current = next(current)
  console.log(current.length)
}

export async function part2() {
  let current = '1321131112'
  for (let i = 0; i < 50; i++) current = next(current)
  console.log(current.length)
}

function next(current) {
  let result = ''
  let i = 0

  while (i < current.length) {
    const digit = current[i]
    let count = 1
    while (i + count < current.length && current[i + count] === digit) count++
    result += `${count}${digit}`
    i += count
  }

  return result
}
