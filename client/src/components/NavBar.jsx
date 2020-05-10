import React, { Component } from 'react'
/*import styled from 'styled-components'*/
import Navbar from 'react-bootstrap/Navbar'

import Links from './Links'

const navStyle = {
    'backgroundColor': 'black',
    'margin': '100px'
};

/*const Container = styled.div.attrs({
    className: 'container',
})`
`
const Nav = styled.nav.attrs({
    className: 'navbar navbar-dark',
})`
    width: 100%;
    background-color: black;
`*/

class NavBar extends Component {
    render() {
        return (
            <Navbar style={{navStyle}}>
                <Links />
            </Navbar>
        )
    }
}

export default NavBar
