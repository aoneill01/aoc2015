import { getInput } from '../helpers/getInput.js'
import memoize from 'memoizee'

export async function part1() {
  const { replacements, molecule } = await parseInput()
  const set = new Set()
  for (const replacement of replacements) {
    moleculesForReplacement(replacement, molecule).forEach((m) => set.add(m))
  }
  console.log(set.size)
}

export async function part2() {
  // const replacements = [
  //   ['e', 'H'],
  //   ['e', 'O'],
  //   ['H', 'HO'],
  //   ['H', 'OH'],
  //   ['O', 'HH'],
  // ]
  // const molecule = 'HOHOHO'
  const { replacements, molecule } = await parseInput()

  let processedReplacements = processReplacements(replacements)
  const replacementMap = {}
  for (const replacement of processedReplacements) {
    for (const element of Object.keys(replacement.locations)) {
      if (!replacementMap.hasOwnProperty(element)) replacementMap[element] = []
      replacementMap[element].push(replacement)
    }
  }

  const tmp = splitMolecule(molecule)
  const starts = []
  const ends = []
  const toProcess = []

  for (let i = 0; i < tmp.length; i++) {
    const info = {
      before: i,
      after: i + 1,
      molecule: tmp[i],
      steps: 0,
    }

    starts[i] = [info]
    ends[i + 1] = [info]
    toProcess.push(info)
  }

  while (toProcess.length > 0) {
    const candidate = toProcess.shift()

    for (const replacement of replacementMap[candidate.molecule] ?? []) {
      for (const i of replacement.locations[candidate.molecule]) {
        for (const match of matches(candidate, replacement, i, starts, ends)) {
          if (!starts[match.before].some((info) => info.molecule === replacement.lhs && info.after === match.after)) {
            const info = {
              before: match.before,
              after: match.after,
              molecule: replacement.lhs,
              steps: match.steps + 1,
            }
            starts[info.before].push(info)
            ends[info.after].push(info)
            toProcess.push(info)
          }
        }
      }
    }
  }

  const answer = Math.min(
    ...starts[0].filter((info) => info.molecule === 'e' && info.after === tmp.length).map((info) => info.steps)
  )
  console.log(answer)
}

async function parseInput() {
  const replacements = []

  const input = await getInput(19)

  let i = 0
  while (input[i] !== '') {
    replacements.push(input[i].split(' => '))
    i++
  }

  i++
  return { replacements, molecule: input[i] }
}

function moleculesForReplacement([input, output], molecule) {
  const results = []
  let startIndex = 0
  let i

  while ((i = molecule.indexOf(input, startIndex)) !== -1) {
    results.push(molecule.substring(0, i) + output + molecule.substring(i + input.length))
    startIndex = i + 1
  }

  return results
}

function processReplacements(replacements) {
  const results = []

  for (const [lhs, rhs] of replacements) {
    const r = {
      lhs,
      rhs: splitMolecule(rhs),
      locations: {},
    }

    for (let i = 0; i < r.rhs.length; i++) {
      const molecule = r.rhs[i]
      if (!r.locations.hasOwnProperty(molecule)) r.locations[molecule] = []
      r.locations[molecule].push(i)
    }

    results.push(r)
  }

  return results
}

function splitMolecule(molecule) {
  const result = []

  for (let i = 0; i < molecule.length; i++) {
    let element = molecule[i]
    if (i + 1 < molecule.length && molecule[i + 1] === molecule[i + 1].toLowerCase()) {
      element += molecule[i + 1]
      i++
    }
    result.push(element)
  }

  return result
}

function matches(info, replacement, startPosition, starts, ends) {
  let a = [{ before: info.before, after: info.after, steps: info.steps }]

  for (let i = startPosition - 1; i >= 0 && a.length > 0; i--) {
    const molecule = replacement.rhs[i]
    const next = []
    for (const b of a) {
      ends[b.before]
        ?.filter((x) => x.molecule === molecule)
        .forEach((match) => {
          next.push({
            ...b,
            before: match.before,
            steps: b.steps + match.steps,
          })
        })
    }
    a = next
  }

  for (let i = startPosition + 1; i < replacement.rhs.length && a.length > 0; i++) {
    const molecule = replacement.rhs[i]
    const next = []
    for (const b of a) {
      starts[b.after]
        ?.filter((x) => x.molecule === molecule)
        .forEach((match) => {
          next.push({
            ...b,
            after: match.after,
            steps: b.steps + match.steps,
          })
        })
    }
    a = next
  }

  return a
}
