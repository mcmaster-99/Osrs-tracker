const Trade = require('../models/trade-model')

createTrade = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a trade',
        })
    }

    const trade = new Trade(body)

    if (!trade) {
        return res.status(400).json({ success: false, error: err })
    }

    trade.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: trade._id,
                message: 'Trade saved.',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Failed to save trade.',
            })
        })
}

updateTrade = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Trade.findOne({ _id: req.params.id }, (err, trade) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Trade not found!',
            })
        }
        trade.item = body.item
        trade.quantity = body.quantity
        trade.buy_price = body.buy_price
        trade.sell_price = body.sell_price
        trade.profit = body.profit
        trade.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: trade._id,
                    message: 'Trade updated!',
                })
                res.redirect('trades/list')
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Trade not updated!',
                })
            })
    })
}

deleteTrade = async (req, res) => {
    await Trade.findOneAndDelete({ _id: req.params.id }, (err, trade) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!trade) {
            return res
                .status(404)
                .json({ success: false, error: `Trade not found` })
        }

        return res.status(200).json({ success: true, data: trade })
    }).catch(err => console.log(err))
}

getTradeById = async (req, res) => {
    await Trade.findOne({ _id: req.params.id }, (err, trade) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: trade })
    }).catch(err => console.log(err))
}

getTrades = async (req, res) => {
    await Trade.find({}, (err, trades) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!trades.length) {
            return res
                .status(404)
                .json({ success: false, error: `Trade not found` })
        }
        return res.status(200).json({ success: true, data: trades })
    }).catch(err => console.log(err))
}

module.exports = {
    createTrade,
    updateTrade,
    deleteTrade,
    getTrades,
    getTradeById,
}
