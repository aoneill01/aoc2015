import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(23)
  // const input = ['inc a', 'jio a, +2', 'tpl a', 'inc a']
  const state = {
    ip: 0,
    a: 0,
    b: 0,
  }

  run(input, state)
  console.log(state.b)
}

export async function part2() {
  const input = await getInput(23)
  const state = {
    ip: 0,
    a: 1,
    b: 0,
  }

  run(input, state)
  console.log(state.b)
}

function run(program, state) {
  while (state.ip >= 0 && state.ip < program.length) {
    const instruction = program[state.ip]
    const operation = instruction.substring(0, 3)

    switch (operation) {
      case 'hlf': {
        const register = instruction.substring(4)
        state[register] = Math.floor(state[register] / 2)
        state.ip++
        break
      }
      case 'tpl': {
        const register = instruction.substring(4)
        state[register] *= 3
        state.ip++
        break
      }
      case 'inc': {
        const register = instruction.substring(4)
        state[register]++
        state.ip++
        break
      }
      case 'jmp': {
        const offset = +instruction.substring(4)
        state.ip += offset
        break
      }
      case 'jie': {
        const register = instruction.substring(4, 5)
        const offset = +instruction.substring(7)
        if (state[register] % 2 === 0) {
          state.ip += offset
        } else {
          state.ip++
        }
        break
      }
      case 'jio': {
        const register = instruction.substring(4, 5)
        const offset = +instruction.substring(7)
        if (state[register] === 1) {
          state.ip += offset
        } else {
          state.ip++
        }
        break
      }
      default:
        console.log('Unexpected instruction at instruction ' + state.ip)
    }
  }
}
