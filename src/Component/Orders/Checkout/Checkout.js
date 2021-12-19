import React from "react";
import { Component } from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreator";

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispachToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: '',
            phone: '',
            paymentType: 'Cash On Delivery',
        },
        isLoading: false,
        isModalOpen: false,
        modalMSG: '',
    }

    goBack = () => {
        this.props.navigate('/');
    }

    inputChange = e => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submit = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post('https://burger-builder-480c2-default-rtdb.firebaseio.com/orders.json', order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMSG: 'Order Placed Successfully!',
                    })
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMSG: 'Something Went Wrong! Order Again',
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMSG: 'Something Went Wrong! Order Again',
                })
            })
    }

    render() {
        let form = (
            <div>
                <h4 style={{
                    border: '1px solid grey',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px'
                }}>Payment: BDT {this.props.totalPrice}</h4>
                <form style={{
                    border: '1px solid grey',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px'
                }}>
                    <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e) => this.inputChange(e)} /><br />
                    <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e) => this.inputChange(e)} /><br />
                    <select name='paymentType' className="form-control" value={this.state.paymentType} onChange={(e) => this.inputChange(e)}>
                        <option value='Cash On Delivery'>Cash On Delivery</option>
                        <option value='Bkash'>Bkash</option>
                    </select><br />
                    <Button style={{ backgroundColor: '#d70f64' }} className="me-auto" onClick={this.submit} disabled={!this.props.purchasable}>Place Order</Button>
                    <Button color="secondary" className="ms-1" onClick={this.goBack}>Cancel</Button>
                </form>
            </div>
        )
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMSG}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Checkout {...props} navigate={navigate} />
}

export default connect(mapStateToProps, mapDispachToProps)(WithNavigate);