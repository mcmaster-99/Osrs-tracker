import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div({
    color: 'green',
    cursor: 'pointer'
})

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateTrade extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/trades/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteTrade extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the trade ${this.props.id} permanently?`,
            )
        ) {
            api.deleteTradeById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class TradesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trades: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTrades().then(trades => {
            this.setState({
                trades: trades.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { trades, isLoading } = this.state

        const columns = [
            {
                Header: 'Item',
                accessor: 'item'
            },
            {
                Header: 'Quantity',
                accessor: 'quantity'
            },
            {
                Header: 'Buy price',
                accessor: 'buy_price'
            },
            {
                Header: 'Sell price',
                accessor: 'sell_price'
            },
            {
                Header: 'Profit',
                accessor: 'profit'
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateTrade id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteTrade id={props.original._id} />
                        </span>
                    )
                },
            }
        ]

        let showTable = true
        if (!trades.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={trades}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default TradesList
