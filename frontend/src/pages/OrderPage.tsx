import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Col, ListGroup, Row, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory, useParams} from 'react-router-dom'
import {Loader} from '../components/Loader'
import {Message} from '../components/Message'
import {getOrderDetails} from '../redux/actions/ordersActions'
import {RootState} from '../redux/store'
import {ICartItem} from '../types/common'

export const OrderPage = () => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const {id: orderId}: {id: string} = useParams()

    const {order, loading, paySuccess, payLoading, error} = useSelector((state: RootState) => state.orders)
    const itemsPrice = order?.orderItems ? order.orderItems.reduce((acc: number, item: ICartItem) => acc += item.price * item.qty, 0).toFixed(2) : 0
    const [sdkReady, setSdkReady] = useState(false)


    const addPayPalScript = async () => {
        const {data: clientId} = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!order || paySuccess) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!(window as any).paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

        //eslint-disable-next-line
    }, [orderId, paySuccess, order])

    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
        <>
            <h1>Order {order?._id || ''}</h1>
            {order &&
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user?.name || ''}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user?.email || ''}`}>{order.user?.email || ''}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered
                                    ? <Message variant='success'>Delivered on {order.deliveredAt || '-'}</Message>
                                    : <Message variant='danger'>Not delivered</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid
                                    ? <Message variant='success'>Paid on {order.paidAt || '-'}</Message>
                                    : <Message variant='danger'>Not paid</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                <strong>Method: </strong>
                                {order.orderItems.length === 0
                                    ? <Message>Order is empty</Message>
                                    : <ListGroup variant='flush'>
                                        {order.orderItems.map((item: ICartItem, i: number) => (
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
                                            ${order.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                            ${order.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>}
        </ >
    )
}