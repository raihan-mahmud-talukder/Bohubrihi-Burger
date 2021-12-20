import React, { Component } from "react";
import { fetchOrders } from "../../redux/actionCreator";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    componentDidUpdate () {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <p>Orders</p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);