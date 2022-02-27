import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(15)
  const ingredients = input.map(parseLine)
  let max = 0
  for (const recipe of combinations(ingredients, 100)) {
    const s = score(recipe)
    if (s > max) max = s
  }
  console.log(max)
}

export async function part2() {
  const input = await getInput(15)
  const ingredients = input.map(parseLine)
  let max = 0
  for (const recipe of combinations(ingredients, 100)) {
    if (calories(recipe) !== 500) continue
    const s = score(recipe)
    if (s > max) max = s
  }
  console.log(max)
}

function* combinations(ingredients, teaspoons) {
  if (ingredients.length === 1 || teaspoons === 0) {
    return yield ingredients.map((ingredient) => ({ teaspoons, ingredient }))
  }

  for (let t = 0; t <= teaspoons; t++) {
    for (const subCombination of combinations(ingredients.slice(1), teaspoons - t)) {
      yield [{ teaspoons: t, ingredient: ingredients[0] }, ...subCombination]
    }
  }
}

function parseLine(line) {
  const regex =
    /(?<name>\w+): capacity (?<cap>-?\d+), durability (?<dur>-?\d+), flavor (?<fla>-?\d+), texture (?<tex>-?\d+), calories (?<cal>-?\d+)/
  const { name, cap, dur, fla, tex, cal } = regex.exec(line).groups
  return { name, capacity: +cap, durability: +dur, flavor: +fla, texture: +tex, calories: +cal }
}

const scoreProperties = ['capacity', 'durability', 'flavor', 'texture']
const weightedProperty = (property) => (amount) => amount.teaspoons * amount.ingredient[property]
const sum = (a, b) => a + b
const product = (a, b) => a * b
const propertyScore = (recipe) => (wp) => Math.max(0, recipe.map(wp).reduce(sum, 0))
const score = (recipe) => scoreProperties.map(weightedProperty).map(propertyScore(recipe)).reduce(product, 1)
const calories = (recipe) => recipe.map(weightedProperty('calories')).reduce(sum, 0)
