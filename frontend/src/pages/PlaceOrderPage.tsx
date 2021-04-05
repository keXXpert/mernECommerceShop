import React, {useEffect} from 'react'
import {Button, Col, ListGroup, Row, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {CheckoutSteps} from '../components/CheckoutSteps'
import {Message} from '../components/Message'
import {createOrder} from '../redux/actions/ordersActions'
import {RootState} from '../redux/store'
import {ICartItem} from '../types/common'

export const PlaceOrderPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress)
    const paymentMethod = useSelector((state: RootState) => state.cart.paymentMethod)
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    const itemsPrice = cartItems.reduce((acc: number, item: ICartItem) => acc += item.price * item.qty, 0).toFixed(2)
    const shippingPrice = itemsPrice > 100 ? 0 : 100
    const taxPrice = (0.15 * itemsPrice).toFixed(2)
    const totalPrice = +itemsPrice + +shippingPrice + +taxPrice

    const {order, success, error} = useSelector((state: RootState) => state.orders)

    const handlePlaceOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice: +taxPrice,
            totalPrice
        }))
    }

    useEffect(() => {
        if (order && success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, order, history])

    if (!shippingAddress) history.push('/shipping')

    return (
        <>
            <CheckoutSteps step={4} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <strong>Method:</strong>
                            {cartItems.length === 0
                                ? <Message>Your cart is empty</Message>
                                : <ListGroup variant='flush'>
                                    {cartItems.map((item: ICartItem, i: number) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        ${itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        ${taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        ${totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {error && <ListGroup.Item>
                                <Message variant='danger'>{error}</Message>
                            </ListGroup.Item>}
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </ >
    )
}