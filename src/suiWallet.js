// 生成规则 sui wallet
const bip39 = require('bip39')
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519')

const { needCount } = require('../config')
const { checkWallet } = require('./utils')

const genWallet = () => {
  const mnemonic = bip39.generateMnemonic()
  const keypair = Ed25519Keypair.deriveKeypair(mnemonic)
  const address = keypair.toSuiAddress()
  const base64PrivateKey = keypair.export().privateKey

  const wallet = {
    mnemonic,
    address,
    base64PrivateKey,
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
私钥：${wallet.base64PrivateKey}
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
