import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(2)
  console.log(
    input
      .map(parseLine)
      .map(({ l, w, h }) => surfaceArea(l, w, h))
      .reduce((sum, sa) => sum + sa)
  )
}

export async function part2() {
  const input = await getInput(2)
  console.log(
    input
      .map(parseLine)
      .map(({ l, w, h }) => ribbon(l, w, h))
      .reduce((sum, sa) => sum + sa)
  )
}

function parseLine(line) {
  const [l, w, h] = line.split('x').map((value) => +value)
  return { l, w, h }
}

function surfaceArea(l, w, h) {
  const sides = [l * w, w * h, l * h]
  const slack = Math.min(...sides)
  return slack + sides.map((side) => side * 2).reduce((sum, val) => sum + val)
}

function ribbon(l, w, h) {
  const perimeters = [perimeter(l, w), perimeter(w, h), perimeter(l, h)]
  const wrap = Math.min(...perimeters)
  const bow = l * w * h
  return bow + wrap
}

function perimeter(s1, s2) {
  return 2 * s1 + 2 * s2
}
