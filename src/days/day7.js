import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(7)

  const r = parseInput(input)
  console.log(r['a']())
}

export async function part2() {
  const input = await getInput(7)

  let r = parseInput(input)
  const part1 = r['a']()
  r = parseInput(input)
  r['b'] = () => part1
  console.log(r['a']())
}

function parseInput(input) {
  const result = {}
  const cache = {}

  const wireOrConst = (id) => {
    if (cache[id]) return cache[id]
    if (/^\d+$/.test(id)) return +id
    return result[id]()
  }

  for (const i of input) {
    const [left, right] = i.split(' -> ')
    if (/^.+ AND .+$/.test(left)) {
      const [i1, i2] = left.split(' AND ')
      result[right] = () => {
        cache[right] = wireOrConst(i1) & wireOrConst(i2)
        return cache[right]
      }
    } else if (/^.+ OR .+$/.test(left)) {
      const [i1, i2] = left.split(' OR ')
      result[right] = () => {
        cache[right] = wireOrConst(i1) | wireOrConst(i2)
        return cache[right]
      }
    } else if (/^.+ LSHIFT .+$/.test(left)) {
      const [i1, i2] = left.split(' LSHIFT ')
      result[right] = () => {
        cache[right] = wireOrConst(i1) << +i2
        return cache[right]
      }
    } else if (/^.+ RSHIFT .+$/.test(left)) {
      const [i1, i2] = left.split(' RSHIFT ')
      result[right] = () => {
        cache[right] = 0xffff & (wireOrConst(i1) >>> +i2)
        return cache[right]
      }
    } else if (/^NOT .+$/.test(left)) {
      result[right] = () => {
        cache[right] = 0xffff & ~wireOrConst(left.substring(4))
        return cache[right]
      }
    } else {
      result[right] = () => {
        cache[right] = wireOrConst(left)
        return cache[right]
      }
    }
  }

  return result
}
