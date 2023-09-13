import React, { useContext } from 'react'
import Form from './pages/Form'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './component/Product/ProductDetails'
import Navbar from './component/Navbar'
import Shipping from './component/Shipping'
import Location from './component/shipping/Location'
import ConfirmOrder from './component/shipping/ConfirmOrder'
import Payment from './component/shipping/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useConst } from '@chakra-ui/react'
import { Context } from './context/contextApi'
import OrderSuccess from './component/shipping/OrderSuccess'
import MyOrders from './component/shipping/MyOrders'
import OrderDetails from './component/shipping/OrderDetails'
import ProtectedRoute from './component/Route/ProtectedRoute'

export default function App() {
    const { StripeApiKey } = useContext(Context)
    return (

        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/form' element={<Form />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/shipping' element={<ProtectedRoute component={Location} />} />
                <Route path='/shipping/order' element={<ProtectedRoute component={ConfirmOrder} />} />
                <Route path='/success' element={<ProtectedRoute component={OrderSuccess} />} />
                <Route path='/orders/me' element={<ProtectedRoute component={MyOrders} />} />
                <Route path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />

                {StripeApiKey && (
                    <Route
                        path="/shipping/payment"
                        element={(
                            <Elements stripe={loadStripe(StripeApiKey)}>
                                <Payment />
                            </Elements>
                        )}
                    />
                )}

            </Routes>


        </div>
    )
}
