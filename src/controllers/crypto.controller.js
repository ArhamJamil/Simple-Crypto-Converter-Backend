import { asyncHandler } from "../utils/asyncHandler.js"
import axios from "axios"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import "dotenv/config.js"

const getCoins = asyncHandler(async (req, res) => {


    let response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
        params:{
            vs_currency: req.params.vs_currency,
            per_page: 100,
            page: 1,
            sparkline: false,
        }
    }, {
        headers: {
            "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status == 404){
        throw new ApiError(404, "Unable to Fetch Coins")
    }
    console.log(response.data)
    return res.status(200).json(new ApiResponse(200, response.data, "success"))

    


})

const convertCoin = asyncHandler(async (req, res) => {

    let response = await axios.get("https://api.coingecko.com/api/v3/simple/price",{
        params:{
            ids: req.params.sourceCrypto,
            vs_currencies: req.params.targetCurrency.toLowerCase(),
            
        }
    }, {
        headers: {
            "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status == 404){
        throw new ApiError(404, "Something went wrong during converting exchange rate")
    }
    const exchangeRate = response.data[req.params.sourceCrypto][req.params.targetCurrency.toLowerCase()]
    const convertedAmount = req.params.amount * exchangeRate

    console.log(exchangeRate)
    return res.status(200).json(new ApiResponse(200, {originalRate: response.data, ConvertedRate: convertedAmount}, "success"))
})


export { getCoins, convertCoin }