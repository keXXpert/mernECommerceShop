import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { listProductDetails } from '../redux/actions/productActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { addToCart } from '../redux/actions/cartActions'

interface ParamsType {
    id: string
}

export const ProductPage = () => {
    const { id } = useParams<ParamsType>()
    const history = useHistory()
    const [qty, setQty] = useState(1)
    const product = useSelector((state: RootState) => state.productDetails.product)
    const error = useSelector((state: RootState) => state.productDetails.error)
    const loading = useSelector((state: RootState) => state.productDetails.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty))
        history.push(`/cart/${id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn  btn-light my-3' to='/'>Go Back</Link>
            {loading ? <Loader /> : error || !product ? <Message variant='danger'>{error}</Message>
                : <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} reviews={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Price: ${product.price}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>Description: {product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                </Col>
                                        <Col>
                                            <strong>{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                </Col>
                                        <Col>
                                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 &&
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={e => setQty(+e.target.value)}>
                                                    {[...Array(product.countInStock)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                }
                                <ListGroup.Item>
                                    <Button
                                        className='btn-block'
                                        type='button'
                                        disabled={!product.countInStock}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}