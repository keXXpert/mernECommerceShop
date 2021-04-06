import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import {logout} from '../redux/actions/userActions'

export const Header = () => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const dispatch = useDispatch()

    console.log(userInfo)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >KEXXPERT eCommerce</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo
                                ? <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item >My Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                : <LinkContainer to="/login">
                                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>
                            }
                            {userInfo?.isAdmin &&
                                <NavDropdown title='Admin' id="adminmenu">
                                    <LinkContainer to='/admin/users'>
                                        <NavDropdown.Item >Users List</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/products'>
                                        <NavDropdown.Item >Products List</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orders'>
                                        <NavDropdown.Item >Orders List</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}