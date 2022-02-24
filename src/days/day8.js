import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(8)
  const totalChars = input.map((line) => line.length).reduce((sum, size) => sum + size)
  const totalMemory = input.map(memorySize).reduce((sum, size) => sum + size)
  console.log(totalChars - totalMemory)
}

export async function part2() {
  const input = await getInput(8)
  const totalChars = input.map((line) => line.length).reduce((sum, size) => sum + size)
  const totalEncoded = input
    .map(encode)
    .map((line) => line.length)
    .reduce((sum, size) => sum + size)
  console.log(totalEncoded - totalChars)
}

function memorySize(s) {
  let size = 0
  for (let i = 1; i < s.length - 1; i++) {
    size++
    if (s[i] === '\\') {
      if (s[i + 1] === 'x') {
        i += 2
      }
      i++
      continue
    }
  }
  return size
}

function encode(s) {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
}
