const bip39 = require('bip39')
const { ethers } = require('ethers')

const { needCount } = require('../config')
const { checkWallet } = require('./utils')

const KEY_PATH = `m/44'/60'/0'/0/0`

const genWallet = () => {
  const mnemonic = bip39.generateMnemonic()
  const evmWallet = ethers.Wallet.fromMnemonic(mnemonic, KEY_PATH)
  const address = evmWallet.address
  const privateKey = evmWallet.privateKey

  const wallet = {
    mnemonic,
    address,
    privateKey,
  }

  return wallet
}

const main = () => {
  let count = 0

  while (true) {
    const wallet = genWallet()
    const isValid = checkWallet(wallet)

    if (isValid) {
      console.log(`
--------------------------------
地址：${wallet.address}
助记词: ${wallet.mnemonic}
私钥：${wallet.privateKey}
--------------------------------
      `)
      count++
    }

    if (count >= needCount) {
      break
    }
  }
}

main()
