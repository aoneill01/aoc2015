import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(14)
  console.log(Math.max(...input.map(parseLine).map((reindeer) => distance(reindeer, 2503))))
}

export async function part2() {
  const input = await getInput(14)
  const reindeers = input.map(parseLine)
  for (let t = 1; t <= 2503; t++) {
    reindeers.forEach((reindeer) => (reindeer.distance = distance(reindeer, t)))
    const max = Math.max(...reindeers.map((reindeer) => reindeer.distance))
    reindeers
      .filter((reindeer) => reindeer.distance === max)
      .forEach((reindeer) => (reindeer.score = (reindeer.score ?? 0) + 1))
  }
  console.log(Math.max(...reindeers.map((reindeer) => reindeer.score ?? 0)))
}

function parseLine(line) {
  const regex =
    /(?<reindeer>\w+) can fly (?<speed>\d+) km\/s for (?<time>\d+) seconds, but then must rest for (?<rest>\d+) seconds./
  const { reindeer, speed, time, rest } = regex.exec(line).groups
  return { reindeer, speed: +speed, time: +time, rest: +rest }
}

function distance(reindeer, time) {
  const fullIterations = Math.floor(time / (reindeer.time + reindeer.rest))
  const remainingTime = time % (reindeer.time + reindeer.rest)
  const remainingAirTime = Math.min(remainingTime, reindeer.time)
  return fullIterations * reindeer.speed * reindeer.time + remainingAirTime * reindeer.speed
}
