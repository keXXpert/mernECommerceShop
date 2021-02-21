import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FormContainer } from '../components/FormContainer'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { register } from '../redux/actions/userActions'
import { RootState } from '../redux/store'

export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const { loading, error, userInfo } = useSelector((state: RootState) => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : ''

    useEffect(() => {
        if (userInfo) history.push(redirect || '/')
    }, [history, redirect, userInfo])

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (password === confirmPassword) {
            setMessage('')
            dispatch(register(name, email, password))
        } else {
            setMessage('Passwords are not equal')
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {(error || message) && <Message variant='danger'>{error || message}</Message>}
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
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}