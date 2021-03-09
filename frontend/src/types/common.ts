export interface IProduct {
    _id: string,
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
}

export interface ICartItem {
    product: string,
    name: string,
    image: string,
    price: number,
    countInStock: number
    qty: number
}

export interface IUserInfo {
    _id: string,
    name: string,
    email: string,
    idAdmin: boolean,
    token: string
}

export interface IUserDetails {
    id: string,
    name: string,
    email: string,
    password: string,
}

export interface IShippingInfo {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export interface IOrderInfo {
    _id?: string,
    user?: string,
    orderItems: ICartItem[]
    shippingAddress: IShippingInfo
    paymentMethod: string
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
}