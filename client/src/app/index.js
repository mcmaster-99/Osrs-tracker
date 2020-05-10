import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import TradesList from '../pages/TradesList.jsx'
import TradesInsert from '../pages/TradesInsert.jsx'
import TradesUpdate from '../pages/TradesUpdate.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/trades/list" exact component={TradesList} />
                <Route path="/trades/create" exact component={TradesInsert} />
                <Route
                    path="/trades/update/:id"
                    exact
                    component={TradesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
