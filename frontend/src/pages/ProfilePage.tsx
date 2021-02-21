import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { updateUserProfile } from '../redux/actions/userActions'
import { RootState } from '../redux/store'

export const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const { loading, error, userInfo, success } = useSelector((state: RootState) => state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [history, userInfo])

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (password === confirmPassword) {
            setMessage('')
            // FIXME update user profile
            dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
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
            </Col>

        </Row>
    )
}