import React from "react";

const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: '1px solid grey',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px',
            }} key={item.type}>{item.amount} x <span style={{ textTransform: 'capitalize' }}>{item.type}</span> </span>
        )
    })
    return (
        <div style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
        }}>
            <p><span className="order">Order Number: </span>{props.order.id}</p>
            <p><span className="order">Order Time: </span>{props.order.orderTime}</p>
            <p><span className="order">Mobile Number: </span>{props.order.customer.phone}</p>
            <p><span className="order">Payment Type: </span>{props.order.customer.paymentType}</p>
            <p><span className="order">Delivery Address: </span>{props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p><span className="order">Total: </span>BDT {props.order.price}</p>
        </div>
    )
}

export default Order;