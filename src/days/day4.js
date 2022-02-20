import md5 from 'md5'

const input = 'ckczppom'

export async function part1() {
  for (let i = 1; ; i++) {
    const hash = md5(`${input}${i}`)
    if (hash.startsWith('00000')) {
      console.log(i)
      break
    }
  }
}

export async function part2() {
  for (let i = 1; ; i++) {
    const hash = md5(`${input}${i}`)
    if (hash.startsWith('000000')) {
      console.log(i)
      break
    }
  }
}
