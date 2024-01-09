const { isUseRule, rule } = require('../config')

const checkWallet = wallet => {
  const isMatch = rule.test(wallet.address)
  if (isUseRule) {
    return isMatch
  } else {
    return true
  }
}

module.exports = {
  checkWallet,
}
