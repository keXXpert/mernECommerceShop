import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Product } from '../components/Product'
import { listProducts } from '../redux/actions/productActions'
import { RootState } from '../redux/store'

export const HomePage = () => {
    const products = useSelector((state: RootState) => state.productList.products)
    const error = useSelector((state: RootState) => state.productList.error)
    const loading = useSelector((state: RootState) => state.productList.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}