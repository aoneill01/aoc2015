import { getInput } from '../helpers/getInput.js'

export async function part1() {
  let grid = await loadInput()

  for (let i = 0; i < 100; i++) grid = step(grid)

  console.log(grid.flat().filter((light) => light === '#').length)
}

export async function part2() {
  let grid = alwaysOn(await loadInput())

  for (let i = 0; i < 100; i++) grid = alwaysOn(step(grid))

  console.log(grid.flat().filter((light) => light === '#').length)
}

async function loadInput() {
  return (await getInput(18)).map((line) => line.split(''))
}

function step(grid) {
  const result = []

  for (let row = 0; row < grid.length; row++) {
    result.push([])
    for (let col = 0; col < grid[0].length; col++) {
      const onNeighbors = countOnNeighbors(grid, row, col)
      if (grid[row][col] === '#') {
        if (onNeighbors === 2 || onNeighbors === 3) result[row][col] = '#'
        else result[row][col] = '.'
      } else {
        if (onNeighbors === 3) result[row][col] = '#'
        else result[row][col] = '.'
      }
    }
  }

  return result
}

function countOnNeighbors(grid, row, col) {
  let result = 0

  for (let dRow = -1; dRow <= 1; dRow++) {
    if (dRow + row < 0 || dRow + row >= grid.length) continue
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dCol + col < 0 || dCol + col >= grid[0].length) continue
      if (dRow === 0 && dCol === 0) continue
      if (grid[dRow + row][dCol + col] === '#') result++
    }
  }

  return result
}

function alwaysOn(grid) {
  grid[0][0] = '#'
  grid[grid.length - 1][0] = '#'
  grid[0][grid[0].length - 1] = '#'
  grid[grid.length - 1][grid[0].length - 1] = '#'
  return grid
}
