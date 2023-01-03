import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await (await getInput(24)).map((n) => +n)
  // const input = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  const goalWeight = input.reduce((acc, n) => acc + n) / 3

  console.log(
    withWeightAndCount(input, goalWeight, 6)
      .map((l) => l.reduce((acc, n) => acc * n, 1))
      .reduce((acc, n) => (n < acc ? n : acc))
  )
}

export async function part2() {
  const input = await (await getInput(24)).map((n) => +n)
  // const input = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  const goalWeight = input.reduce((acc, n) => acc + n) / 4

  console.log(
    withWeightAndCount(input, goalWeight, 5)
      .map((l) => l.reduce((acc, n) => acc * n, 1))
      .reduce((acc, n) => (n < acc ? n : acc))
  )
}

function withWeightAndCount(list, weight, count) {
  const results = []

  const indexes = []
  for (let i = 0; i < count; i++) {
    indexes.push(i)
  }

  while (true) {
    if (indexes.map((i) => list[i]).reduce((acc, n) => acc + n) === weight) {
      results.push(indexes.map((i) => list[i]))
    }

    let complete = true
    for (let j = 0; j < count; j++) {
      let i = indexes.length - 1 - j
      if (indexes[i] < list.length - 1 - j) {
        indexes[i]++
        for (let k = 0; k < j; k++) {
          indexes[i + k + 1] = indexes[i] + k + 1
        }
        complete = false
        break
      }
    }

    if (complete) break
  }

  return results
}
