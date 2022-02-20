import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = (await getInput(3))[0]
  let location = { x: 0, y: 0 }
  const history = [serialize(location)]
  input.split('').forEach((direction) => {
    location = move(location, direction)
    history.push(serialize(location))
  })
  console.log(new Set(history).size)
}

export async function part2() {
  const input = (await getInput(3))[0]
  const locations = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]
  const history = locations.map(serialize)
  for (let i = 0; i < input.length; i++) {
    const j = i % locations.length
    const location = move(locations[j], input[i])
    history.push(serialize(location))
    locations[j] = location
  }
  console.log(new Set(history).size)
}

function move({ x, y }, direction) {
  switch (direction) {
    case '>':
      return { x: x + 1, y }
    case '<':
      return { x: x - 1, y }
    case '^':
      return { x: x, y: y + 1 }
    case 'v':
      return { x: x, y: y - 1 }
  }
}

function serialize({ x, y }) {
  return `${x},${y}`
}
