import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Product } from '../components/Product'
import { IProduct } from '../types/common'

export const HomePage = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('/api/products')
            if (data) setProducts(data)
        }

        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}