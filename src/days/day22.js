const enemyDamage = 8
const enemyInitHp = 55
let seenDepth = 0
let isHard = false

export async function part1() {
  console.log(manaMyTurn(50, enemyInitHp, 500, 0, 0, 0, 1))
}

export async function part2() {
  isHard = true
  console.log(manaMyTurn(50, enemyInitHp, 500, 0, 0, 0, 1))
}

function manaMyTurn(myHp, enemyHp, myMana, shieldTimer, poisonTimer, rechargeTimer, depth) {
  if (depth > seenDepth) {
    seenDepth = depth
  }

  if (depth > 20) return null

  if (isHard) {
    myHp--
    if (myHp <= 0) return null
  }

  if (poisonTimer > 0) {
    enemyHp -= 3
    if (enemyHp <= 0) return 0
  }

  if (rechargeTimer > 0) myMana += 101

  shieldTimer = decTimer(shieldTimer)
  poisonTimer = decTimer(poisonTimer)
  rechargeTimer = decTimer(rechargeTimer)

  const options = []

  if (myMana >= 53) {
    if (enemyHp - 4 <= 0) {
      options.push(53)
    } else {
      const cost = manaEnemyTurn(myHp, enemyHp - 4, myMana - 53, shieldTimer, poisonTimer, rechargeTimer, depth)
      if (cost !== null) options.push(53 + cost)
    }
  }

  if (myMana >= 73) {
    if (enemyHp - 2 <= 0) {
      options.push(73)
    } else {
      const cost = manaEnemyTurn(myHp + 2, enemyHp - 2, myMana - 73, shieldTimer, poisonTimer, rechargeTimer, depth)
      if (cost !== null) options.push(73 + cost)
    }
  }

  if (myMana >= 113 && shieldTimer === 0) {
    const cost = manaEnemyTurn(myHp, enemyHp, myMana - 113, 6, poisonTimer, rechargeTimer, depth)
    if (cost !== null) options.push(113 + cost)
  }

  if (myMana >= 173 && poisonTimer === 0) {
    const cost = manaEnemyTurn(myHp, enemyHp, myMana - 173, shieldTimer, 6, rechargeTimer, depth)
    if (cost !== null) options.push(173 + cost)
  }

  if (myMana >= 229 && rechargeTimer === 0) {
    const cost = manaEnemyTurn(myHp, enemyHp, myMana - 229, shieldTimer, poisonTimer, 5, depth)
    if (cost !== null) options.push(229 + cost)
  }

  if (options.length === 0) return null

  return Math.min(...options)
}

function manaEnemyTurn(myHp, enemyHp, myMana, shieldTimer, poisonTimer, rechargeTimer, depth) {
  if (poisonTimer > 0) {
    enemyHp -= 3
    if (enemyHp <= 0) return 0
  }

  if (rechargeTimer > 0) myMana += 101

  const myArmor = shieldTimer > 0 ? 7 : 0

  myHp -= Math.max(1, enemyDamage - myArmor)
  if (myHp <= 0) return null

  shieldTimer = decTimer(shieldTimer)
  poisonTimer = decTimer(poisonTimer)
  rechargeTimer = decTimer(rechargeTimer)

  return manaMyTurn(myHp, enemyHp, myMana, shieldTimer, poisonTimer, rechargeTimer, depth + 1)
}

function decTimer(timer) {
  return Math.max(0, timer - 1)
}
