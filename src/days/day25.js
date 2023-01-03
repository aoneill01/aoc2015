export async function part1() {
  let row = 1
  let col = 1
  let value = 20151125

  while (!(row === 3010 && col === 3019)) {
    if (row === 1) {
      row = col + 1
      col = 1
    } else {
      row--
      col++
    }

    value = (value * 252533) % 33554393
  }

  console.log(value)
}

export async function part2() {}
