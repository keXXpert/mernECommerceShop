import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IProduct } from '../types/common'
import { Rating } from './Rating'

interface ProductPropsType {
    product: IProduct
}

export const Product = ({ product }: ProductPropsType) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`} >
                <Card.Img src={product.image} variant='top' />
            </a>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='h6'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <Rating value={product.rating} reviews={product.numReviews} />
                    </div>
                </Card.Text>
                <Card.Text as='h3' className={'my-1'}>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}