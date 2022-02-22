import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(6)
  const on = new Set()
  for (const { action, x1, y1, x2, y2 } of input.map(parseLine)) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (action) {
          case 'turn on':
            on.add(toString(x, y))
            break
          case 'turn off':
            on.delete(toString(x, y))
            break
          case 'toggle':
            if (on.has(toString(x, y))) on.delete(toString(x, y))
            else on.add(toString(x, y))
            break
          default:
            throw new Error('unknown action')
        }
      }
    }
  }
  console.log(on.size)
}

export async function part2() {
  const input = await getInput(6)
  const brightness = new Map()
  for (const { action, x1, y1, x2, y2 } of input.map(parseLine)) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        const key = toString(x, y)
        switch (action) {
          case 'turn on':
            brightness.set(key, (brightness.get(key) ?? 0) + 1)
            break
          case 'turn off':
            brightness.set(key, Math.max(0, (brightness.get(key) ?? 0) - 1))
            break
          case 'toggle':
            brightness.set(key, (brightness.get(key) ?? 0) + 2)
            break
          default:
            throw new Error('unknown action')
        }
      }
    }
  }
  console.log([...brightness.values()].reduce((sum, value) => sum + value))
}

const regex = /(?<action>(turn on)|(turn off)|toggle) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/

function parseLine(line) {
  const { action, x1, y1, x2, y2 } = regex.exec(line).groups
  return { action, x1: +x1, y1: +y1, x2: +x2, y2: +y2 }
}

function toString(x, y) {
  return `${x},${y}`
}
