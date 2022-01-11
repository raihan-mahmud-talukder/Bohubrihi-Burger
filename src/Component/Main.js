import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Route, Routes } from 'react-router-dom';
import Auth from "./Auth/Auth";

const Main = props => {
    return (
        <div>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path='/orders' exact element={<Orders />} />
                    <Route path='/checkout' exact element={<Checkout />} />
                    <Route path='/login' exact element={<Auth />} />
                    <Route path='/' exact element={<BurgerBuilder />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main;