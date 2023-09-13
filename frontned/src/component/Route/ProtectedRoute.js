import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/contextApi';
import { Redirect, Route, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {

    const { user } = useContext(Context)

    const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
    };

    const navigate = useNavigate()

    useEffect(() => {
        if (isEmpty(user)) {
            navigate('/form')
        }
    }, [])

    return (
        <div>
            {!isEmpty(user) ?
                <Component /> : <></>}
        </div>
    )
}
