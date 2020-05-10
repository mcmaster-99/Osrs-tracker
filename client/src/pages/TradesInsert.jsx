import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1'
})`font-style: italic;`

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 250px;
`

const Label = styled.label`
    font-style: bold;
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    width: 100px;
`

const Button = styled.button.attrs({
    className: `btn btn-success`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
})`
    margin: 15px 15px 15px 5px;
`

class TradesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: '',
            quantity: '',
            buy_price: '',
            sell_price: '',
            profit: '',
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

    handleChangeInputProfit = async event => {
        const {quantity, buy_price, sell_price} = this.state
        const profit = (sell_price - buy_price) * quantity
        this.setState({ profit })
    }

    handleIncludeTrade = async () => {
        const { item, quantity, buy_price, sell_price } = this.state
        const profit = (sell_price - buy_price) * quantity
        const trade = { item, quantity, buy_price, sell_price, profit }
        console.log(trade)
        await api.insertTrade(trade).then(res => {
            window.alert(`Trade added successfully`)
            //reset state
            this.setState({
                name: '',
                quantity: '',
                buy_price: '',
                sell_price: '',
                profit: '',
            })
        })
    }

    render() {
        const { item, quantity, buy_price, sell_price } = this.state
        return (
            <Wrapper>
                <Title>Add Trade</Title>

                <Label>Item Name: </Label>
                <InputText
                    type="text"
                    defaultValue={item}
                    onChange={this.handleChangeInputItem}
                />

                <Label>Quantity: </Label>
                <InputText
                    type="number"
                    lang="en-US"
                    min="0"
                    max="2147000000"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    defaultValue={quantity}
                    onChange={this.handleChangeInputQuantity}
                />

                <Label>Buy Price: </Label>
                <InputText
                    type="number"
                    defaultValue={buy_price}
                    onChange={this.handleChangeInputBuyPrice}
                />

                <Label>Sell Price: </Label>
                <InputText
                    type="number"
                    defaultValue={sell_price}
                    onChange={this.handleChangeInputSellPrice}
                />

                <Button onClick={this.handleIncludeTrade}>Add Trade</Button>
                <CancelButton href={'/trades/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TradesInsert