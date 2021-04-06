import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {useHistory} from 'react-router-dom'
import {Loader} from '../components/Loader'
import {Message} from '../components/Message'
import {getUserOrders} from '../redux/actions/ordersActions'
import {updateUserProfile} from '../redux/actions/userActions'
import {RootState} from '../redux/store'

export const ProfilePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const {loading, error, userInfo, success} = useSelector((state: RootState) => state.user)
    const orderList = useSelector((state: RootState) => state.orders.orderList)
    const ordersLoading = useSelector((state: RootState) => state.orders.loading)
    // const ordersSuccess = useSelector((state: RootState) => state.orders.success)
    const ordersError = useSelector((state: RootState) => state.orders.error)

    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            dispatch(getUserOrders())
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
        //eslint-disable-next-line
    }, [history, userInfo])

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (password === confirmPassword) {
            setMessage('')
            dispatch(updateUserProfile({id: userInfo._id, name, email, password}))
        } else {
            setMessage('Passwords are not equal')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>My Profile</h2>
                {(error || message) && <Message variant='danger'>{error || message}</Message>}
                {success && <Message variant='success'>Profile sucessfully updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Your First and Last Name'
                            value={name}
                            onChange={(evt) => setName(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Retype the password'
                            value={confirmPassword}
                            onChange={(evt) => setConfirmPassword(evt.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {ordersLoading ? <Loader />
                    : ordersError ? <Message variant='danger'>{ordersError}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList && orderList?.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt?.substr(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid
                                                ? order.paidAt?.substr(0, 10)
                                                : <i className='fas fa-times' style={{color: 'red'}} />}
                                            </td>
                                            <td>{order.isDelivered
                                                ? order.deliveredAt?.substr(0, 10)
                                                : <i className='fas fa-times' style={{color: 'red'}} />}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant='light' className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>

        </Row>
    )
}