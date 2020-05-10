const express = require('express')

const TradeCtrl = require('../controllers/trade-ctrl')

const router = express.Router()

router.post('/trade', TradeCtrl.createTrade)
router.put('/trade/:id', TradeCtrl.updateTrade)
router.delete('/trade/:id', TradeCtrl.deleteTrade)
router.get('/trade/:id', TradeCtrl.getTradeById)
router.get('/trade', TradeCtrl.getTrades)

module.exports = router
