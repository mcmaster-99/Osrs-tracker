import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase',
})``

const List = styled.div.attrs({
    className: 'navbar-nav',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar">
                    Profit Tracker
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/trades/list" className="nav-link">
                                List Trades
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/trades/create" className="nav-link">
                                Add Trade
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
