const input = 'hepxcrzz'

export async function part1() {
  console.log(nextValid(input))
}

export async function part2() {
  console.log(nextValid(nextValid(input)))
}

function nextLetter(password, i) {
  return String.fromCharCode(password.charCodeAt(i) + 1)
}

function incrementPassword(password) {
  for (let i = password.length - 1; i >= 0; i--) {
    const next = nextLetter(password, i)
    if (next <= 'z') {
      return password.substring(0, i) + next + password.substring(i + 1)
    }
    password = password.substring(0, i) + 'a' + password.substring(i + 1)
  }
  return 'aaaaaaaa'
}

function isValid(password) {
  if (['i', 'o', 'l'].some((invalid) => password.includes(invalid))) return false

  let hasStraight = false
  for (let i = 0; i < password.length - 2; i++) {
    if (nextLetter(password, i) === password[i + 1] && nextLetter(password, i + 1) === password[i + 2]) {
      hasStraight = true
      break
    }
  }
  if (!hasStraight) return false

  let doubles = new Set()
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) doubles.add(password[i])
  }
  return doubles.size >= 2
}

function nextValid(password) {
  do {
    password = incrementPassword(password)
  } while (!isValid(password))

  return password
}
