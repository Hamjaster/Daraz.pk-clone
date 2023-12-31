import { createContext, useEffect, useState } from "react";
import clothing from '../images/clothing.png'
import tech from '../images/tech.png'
import grocery from '../images/grocery.png'
import beauty from '../images/beauty.png'
import sports from '../images/sports.png'
import edu from '../images/education.png'
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
    const [sidebar, setSidebar] = useState(false)
    const proxy = 'https://daraz-pk-clone-api.vercel.app'
    // const proxy = 'htt/p://127.0.0.1:5000'

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
        const { data } = await axios.get(`${proxy}/payment/apikey`)
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
            img: edu
        },
        {
            name: 'Health/Fitness',
            id: 4,
            img: beauty
        },
    ]

    return (
        <Context.Provider value={{ Product, setProduct, setCount, count, setKeyword, keyword, category, setCategory, categories, cart, setCart, isDrawerOpen, closeDrawer, openDrawer, isOrderModalOpen, setisOrderModalOpen, openOrderModal, closeOrderModal, selectedCountry, setSelectedCountry, selectedState, setSelectedState, selectedCity, setSelectedCity, number, setNumber, user, setUser, StripeApiKey, setStripeApiKey, orderInfo, setOrderInfo, orders, setOrders, proxy, sidebar, setSidebar }}>
            {children}
        </Context.Provider>
    )
}

