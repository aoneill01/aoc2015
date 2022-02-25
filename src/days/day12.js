import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(12)
  const json = JSON.parse(input[0])
  console.log(numbers(json).reduce((sum, num) => sum + num))
}

export async function part2() {
  const input = await getInput(12)
  const json = JSON.parse(input[0])
  console.log(numbers2(json).reduce((sum, num) => sum + num))
}

function numbers(json) {
  if (Array.isArray(json)) {
    return json.flatMap(numbers)
  } else if (typeof json === 'string') {
    return []
  } else if (typeof json === 'number') {
    return [json]
  } else if (typeof json === 'object') {
    return Object.values(json).flatMap(numbers)
  } else {
    throw new Error('Unexpected type')
  }
}

function numbers2(json) {
  if (Array.isArray(json)) {
    return json.flatMap(numbers2)
  } else if (typeof json === 'string') {
    return []
  } else if (typeof json === 'number') {
    return [json]
  } else if (typeof json === 'object') {
    if (Object.values(json).includes('red')) return []
    return Object.values(json).flatMap(numbers2)
  } else {
    throw new Error('Unexpected type ')
  }
}
