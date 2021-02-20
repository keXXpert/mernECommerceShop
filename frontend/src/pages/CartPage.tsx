import React from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Message } from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { RootState } from '../redux/store'
import { ICartItem } from '../types/common'

export const CartPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length
                    ? <ListGroup variant='flush'>
                        {cartItems.map((item: ICartItem) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={e => dispatch(addToCart(item.product, +e.target.value))}
                                        >
                                            {[...Array(item.countInStock)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => dispatch(removeFromCart(item))}>
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    : <Message>Your cart is empty. <Link to='/'>Go Back</Link></Message>
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc: number, item: ICartItem) => acc += item.qty, 0)}) items
                            </h2>
                            ${cartItems.reduce((acc: number, item: ICartItem) => acc += item.price * item.qty, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={!cartItems.length}
                                onClick={() => history.push('/login?redirect=shippinng')}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}