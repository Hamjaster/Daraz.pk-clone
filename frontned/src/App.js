import React, { useContext, Suspense } from 'react';
import Form from './pages/Form';
import { Elements } from '@stripe/react-stripe-js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { loadStripe } from '@stripe/stripe-js';
import { Context } from './context/contextApi';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'

// Lazily loaded components
const Home = React.lazy(() => import('./pages/Home'));
const ProductDetails = React.lazy(() => import('./component/Product/ProductDetails'));
const Navbar = React.lazy(() => import('./component/Navbar'));
const Location = React.lazy(() => import('./component/shipping/Location'));
const ConfirmOrder = React.lazy(() => import('./component/shipping/ConfirmOrder'));
const Payment = React.lazy(() => import('./component/shipping/Payment'));
const OrderSuccess = React.lazy(() => import('./component/shipping/OrderSuccess'));
const MyOrders = React.lazy(() => import('./component/shipping/MyOrders'));
const OrderDetails = React.lazy(() => import('./component/shipping/OrderDetails'));

export default function App() {
    const { StripeApiKey } = useContext(Context);

    return (
        <div>
            <Suspense fallback={
                <div className='flex items-center justify-center h-screen'>
                    <Spinner color='orange.500' size={'xl'} thickness='5px' />
                </div>
            }>
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
            </Suspense>
        </div>
    );
}
