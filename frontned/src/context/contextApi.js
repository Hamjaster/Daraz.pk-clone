import { createContext, useEffect, useState } from "react";
import clothing from '../images/clothing.png'
import tech from '../images/tech.png'
import grocery from '../images/grocery.png'
import beauty from '../images/beauty.png'
import sports from '../images/sports.png'
import axios from "axios";
export const Context = createContext('')

export const ContextProvider = ({ children }) => {

    const [Product, setProduct] = useState({})
    const [count, setCount] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const [cart, setCart] = useState(localStorage.getItem('cardInfo') ? JSON.parse(localStorage.getItem('cardInfo')) : [])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isOrderModalOpen, setisOrderModalOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [number, setNumber] = useState(null)
    const [user, setUser] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {})
    const [StripeApiKey, setStripeApiKey] = useState('')
    const [orderInfo, setOrderInfo] = useState({})
    const [orders, setOrders] = useState([])

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }
    const openDrawer = () => {
        setIsDrawerOpen(true)
    }

    const closeOrderModal = () => {
        setisOrderModalOpen(false)
    }
    const openOrderModal = () => {
        setisOrderModalOpen(true)
    }

    const getStripeApiKey = async () => {
        const { data } = await axios.get('http://localhost:5000/payment/apikey')
        console.log(data)
        setStripeApiKey(data.StripeApiKey)
    }

    useEffect(() => {
        localStorage.setItem('cardInfo', JSON.stringify(cart))
        console.log(cart)
    }, [cart])

    useEffect(() => {
        getStripeApiKey()
    }, [])


    const categories = [
        {
            name: 'Fashion/Clothing',
            id: 0,
            img: clothing
        },
        {
            name: 'Electronics/Tech',
            id: 1,
            img: tech
        },
        {
            name: 'Groceries',
            id: 2,
            img: grocery
        },
        {
            name: 'Education/Household',
            id: 3,
            img: sports
        },
        {
            name: 'Health/Fitness',
            id: 4,
            img: beauty
        },
    ]

    return (
        <Context.Provider value={{ Product, setProduct, setCount, count, setKeyword, keyword, category, setCategory, categories, cart, setCart, isDrawerOpen, closeDrawer, openDrawer, isOrderModalOpen, setisOrderModalOpen, openOrderModal, closeOrderModal, selectedCountry, setSelectedCountry, selectedState, setSelectedState, selectedCity, setSelectedCity, number, setNumber, user, setUser, StripeApiKey, setStripeApiKey, orderInfo, setOrderInfo, orders, setOrders }}>
            {children}
        </Context.Provider>
    )
}

