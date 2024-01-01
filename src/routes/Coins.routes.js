import {Router} from "express"
import {getCoins, convertCoin} from "../controllers/crypto.controller.js"

const CoinRouter = Router()


CoinRouter.route("/Coins/:vs_currency").get(getCoins)
CoinRouter.route("/Convert/:sourceCrypto/:amount/:targetCurrency").get(convertCoin)

export {CoinRouter}