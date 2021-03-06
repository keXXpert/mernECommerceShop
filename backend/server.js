import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { errorHandler, errorNotFound } from './middleware/errorMiddleware.js'

// routes
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/order', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(errorNotFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))