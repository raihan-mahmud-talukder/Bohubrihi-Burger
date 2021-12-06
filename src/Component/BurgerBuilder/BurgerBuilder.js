import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from './Controls/Controls';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 }
        ],
        totalPrice: 80,
    }

    addIngredient = type => {
        const ingredients = [...this.state.ingredients];
        const new_price = this.state.totalPrice + INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) item.amount++;
        }
        this.setState({ ingredients: ingredients, totalPrice: new_price });
    }

    removeIngredient = type => {
        const ingredients = [...this.state.ingredients];
        const new_price = this.state.totalPrice - INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) return;
                item.amount--;
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: new_price });
        console.log(type);
    }

    render() {
        return (
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    price={this.state.totalPrice} />
            </div>
        )
    }
}