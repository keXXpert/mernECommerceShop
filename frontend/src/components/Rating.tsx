import React from 'react'

interface RatingPropsType {
    value: number,
    reviews: number,
    color?: string
}

export const Rating = ({ value, reviews, color = '#f8e825' }: RatingPropsType) => {
    return (
        <div className='rating'>
            <span>
                {[...Array(5)].map((_: undefined, i: number) => {
                    const cls = value >= i + 1
                        ? 'fas fa-star'                 //full star
                        : value >= i + .5
                            ? 'fas fa-star-half-alt'    //half star
                            : 'far fa-star'             //empty star
                    return <i key={'Star' + i} style={{ color }} className={cls} />
                })}
            </span>
            <span> of {reviews} reviews</span>
        </div>
    )
}