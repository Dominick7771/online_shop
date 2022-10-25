import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from 'react-router-dom'
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const isAdmin = localStorage.getItem('role') === 'ADMIN'

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('role')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>SHOP</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {isAdmin ?
                            <Button variant={'outline-light'} onClick={() => history.push(ADMIN_ROUTE)}>Administration</Button> :
                            <Button variant={'outline-light'} onClick={() => history.push(BASKET_ROUTE)}>BASKET</Button>}
                        <Button variant={'outline-light'} onClick={logOut}
                                className="ms-3">Logout</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;