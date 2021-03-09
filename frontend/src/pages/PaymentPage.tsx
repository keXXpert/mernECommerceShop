import React, {useState} from 'react'
import {Button, Col, Form, FormLabel} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {CheckoutSteps} from '../components/CheckoutSteps'
import {FormContainer} from '../components/FormContainer'
import {savePaymentMethod} from '../redux/actions/cartActions'
import {RootState} from '../redux/store'

export const PaymentPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress)
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    if (!shippingAddress) history.push('/shipping')

    return (
        <FormContainer>
            <CheckoutSteps step={3} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='payment-method'>
                    <FormLabel as='legend'>Select Method</FormLabel>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(evt) => setPaymentMethod(evt.target.value)}
                        />
                        {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='stripe'
                        name='paymentMethod'
                        value='Stripe'
                        checked
                        onChange={(evt) => setPaymentMethod(evt.target.value)}
                    /> */}

                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer >
    )
}