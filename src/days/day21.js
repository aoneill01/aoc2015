import { getInput } from '../helpers/getInput.js'

const weapons = [
  {
    cost: 8,
    damage: 4,
    armor: 0,
  },
  {
    cost: 10,
    damage: 5,
    armor: 0,
  },
  {
    cost: 25,
    damage: 6,
    armor: 0,
  },
  {
    cost: 40,
    damage: 7,
    armor: 0,
  },
  {
    cost: 74,
    damage: 8,
    armor: 0,
  },
]

const armors = [
  {
    cost: 13,
    damage: 0,
    armor: 1,
  },
  {
    cost: 31,
    damage: 0,
    armor: 2,
  },
  {
    cost: 53,
    damage: 0,
    armor: 3,
  },
  {
    cost: 75,
    damage: 0,
    armor: 4,
  },
  {
    cost: 102,
    damage: 0,
    armor: 5,
  },
]

const rings = [
  {
    cost: 25,
    damage: 1,
    armor: 0,
  },
  {
    cost: 50,
    damage: 2,
    armor: 0,
  },
  {
    cost: 100,
    damage: 3,
    armor: 0,
  },
  {
    cost: 20,
    damage: 0,
    armor: 1,
  },
  {
    cost: 40,
    damage: 0,
    armor: 2,
  },
  {
    cost: 80,
    damage: 0,
    armor: 3,
  },
]

const nothing = { cost: 0, damage: 0, armor: 0 }

const enemyHp = 109
const enemyDamage = 8
const enemyArmor = 2

export async function part1() {
  const weaponOptions = [...weapons]
  const armorOptions = [nothing, ...armors]
  const ringOptions = [nothing, ...rings]
  for (let i = 0; i < rings.length - 1; i++) {
    for (let j = i + 1; j < rings.length; j++) {
      ringOptions.push({
        cost: rings[i].cost + rings[j].cost,
        damage: rings[i].damage + rings[j].damage,
        armor: rings[i].armor + rings[j].armor,
      })
    }
  }

  let minCost = null

  for (const weapon of weaponOptions) {
    for (const armor of armorOptions) {
      for (const ring of ringOptions) {
        if (
          isWinner(
            100,
            weapon.damage + armor.damage + ring.damage,
            weapon.armor + armor.armor + ring.armor,
            enemyHp,
            enemyDamage,
            enemyArmor
          )
        ) {
          const cost = weapon.cost + armor.cost + ring.cost
          if (minCost === null || cost < minCost) {
            minCost = cost
          }
        }
      }
    }
  }

  console.log(minCost)
}

export async function part2() {
  const weaponOptions = [...weapons]
  const armorOptions = [nothing, ...armors]
  const ringOptions = [nothing, ...rings]
  for (let i = 0; i < rings.length - 1; i++) {
    for (let j = i + 1; j < rings.length; j++) {
      ringOptions.push({
        cost: rings[i].cost + rings[j].cost,
        damage: rings[i].damage + rings[j].damage,
        armor: rings[i].armor + rings[j].armor,
      })
    }
  }

  let maxCost = null

  for (const weapon of weaponOptions) {
    for (const armor of armorOptions) {
      for (const ring of ringOptions) {
        if (
          !isWinner(
            100,
            weapon.damage + armor.damage + ring.damage,
            weapon.armor + armor.armor + ring.armor,
            enemyHp,
            enemyDamage,
            enemyArmor
          )
        ) {
          const cost = weapon.cost + armor.cost + ring.cost
          if (maxCost === null || cost > maxCost) {
            maxCost = cost
          }
        }
      }
    }
  }

  console.log(maxCost)
}

function isWinner(myHp, myDamage, myArmor, enemyHp, enemyDamage, enemyArmor) {
  const myAttack = Math.max(1, myDamage - enemyArmor)
  const enemyAttack = Math.max(1, enemyDamage - myArmor)

  const roundsToKillEnemy = Math.ceil(enemyHp / myAttack)
  const roundsToKillMe = Math.ceil(myHp / enemyAttack)

  return roundsToKillEnemy <= roundsToKillMe
}
