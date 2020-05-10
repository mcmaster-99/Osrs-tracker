import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})

const Wrapper = styled.div.attrs({
    className: 'form-group',
    margin: '0 30px'
})

const Label = styled.label({
    margin: '5px'
})

const InputText = styled.input.attrs({
    className: 'form-control',
    margin: '5px'
})

const Button = styled.button.attrs({
    className: `btn btn-primary`,
    margin: '15px 15px 15px 15px'
})

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
    margin: '15px 15px 15px 5px'
})

class TradesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            item: '',
            quantity: '',
            buy_price: '',
            sell_price: '',
            profit: ''
        }
    }

    handleChangeInputItem = async event => {
        const item = event.target.value
        this.setState({ item })
    }

    handleChangeInputQuantity = async event => {
        const quantity = event.target.value
        this.setState({ quantity })
    }

    handleChangeInputBuyPrice = async event => {
        const buy_price = event.target.value
        this.setState({ buy_price })
    }

    handleChangeInputSellPrice = async event => {
        const sell_price = event.target.value
        this.setState({ sell_price })
    }

    handleRefreshListingTable = async event => {
        window.location.href = '/trades/list'
    }

    handleChangeInputProfit = async event => {
        const {quantity, buy_price, sell_price} = this.state
        const profit = (sell_price - buy_price) * quantity
        this.setState({ profit })
    }

    handleUpdateTrade = async () => {
        const { id, item, quantity, buy_price, sell_price, profit } = this.state
        const trade_json = { id, item, quantity, buy_price, sell_price, profit }
        console.log(trade_json)
        await api.updateTradeById(id, trade_json).then(res => {
            window.alert(`Trade updated successfully`)
            this.setState({
                item: '',
                quantity: '',
                buy_price: '',
                sell_price: '',
                profit: ''
            })
            this.handleRefreshListingTable()
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const trade = await api.getTradeById(id)
        this.setState({
            item: trade.data.data.item,
            quantity: trade.data.data.quantity,
            buy_price: trade.data.data.buy_price,
            sell_price: trade.data.data.sell_price,
            profit: trade.data.data.profit,
        })
    }

    render() {
        const { item, quantity, buy_price, sell_price } = this.state
        return (
            <Wrapper>
                <Title>Update {item} Transaction</Title>

                <Label>Item name: </Label>
                <InputText
                    type="text"
                    value={item}
                    onChange={this.handleChangeInputItem}
                />

                <Label>Quantity: </Label>
                <InputText
                    type="number"
                    min="0"
                    max="2147000000"
                    defaultValue={quantity}
                    onChange={this.handleChangeInputQuantity}
                />

                <Label>Buy price: </Label>
                <InputText
                    type="number"
                    min="0"
                    max="2147000000"
                    defaultValue={buy_price}
                    onChange={this.handleChangeInputBuyPrice}
                />

                <Label>Sell price: </Label>
                <InputText
                    type="number"
                    min="0"
                    max="2147000000"
                    defaultValue={sell_price}
                    onChange={this.handleChangeInputSellPrice}
                />

                <Button onClick={this.handleUpdateTrade}>Update Trade</Button>
                <CancelButton href={'/trades/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TradesUpdate
