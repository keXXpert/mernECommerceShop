import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {CheckoutSteps} from '../components/CheckoutSteps'
import {FormContainer} from '../components/FormContainer'
import {saveShippingAddress} from '../redux/actions/cartActions'
import {RootState} from '../redux/store'

export const ShippingPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress)
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step={2} />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Address'
                        value={address}
                        required
                        onChange={(evt) => setAddress(evt.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your City'
                        value={city}
                        required
                        onChange={(evt) => setCity(evt.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Postal Code'
                        value={postalCode}
                        required
                        onChange={(evt) => setPostalCode(evt.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Country'
                        value={country}
                        required
                        onChange={(evt) => setCountry(evt.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}