import React from "react";
import { Component } from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreator";
import { Formik } from "formik";

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
        isLoading: false,
        isModalOpen: false,
        modalMSG: '',
    }

    goBack = () => {
        this.props.navigate('/');
    }

    submit = (values) => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: values,
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
                }}>Payment: BDT {this.props.totalPrice}
                </h4>
                <Formik
                    initialValues={
                        {
                            deliveryAddress: '',
                            phone: '',
                            paymentType: '',
                        }
                    }
                    onSubmit={
                        (values) => {
                            console.log('Values:', values)
                            this.submit(values);
                        }
                    }
                    validate={
                        values => {
                            const errors = {};
                            if (!values.deliveryAddress) {
                                errors.deliveryAddress = 'Required';
                            }
                            if (!values.phone) {
                                errors.phone = 'Required';
                            } else if (!/^(\+)?(88)?01[3-9]([0-9]){8}/.test(values.phone)) {
                                errors.phone = 'Invalid Mobile';
                            }
                            if (!values.paymentType) {
                                errors.paymentType = 'Required';
                            } else if (values.paymentType === 'Select Payment Gateway') {
                                errors.paymentType = 'Required';
                            }
                            console.log('Errors:', errors);
                            return errors;
                        }
                    }
                >
                    {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                        <form style={{
                            border: '1px solid grey',
                            boxShadow: '1px 1px #888888',
                            borderRadius: '5px',
                            padding: '20px'
                        }}
                            onSubmit={handleSubmit}
                        >
                            <textarea
                                name="deliveryAddress"
                                id="deliveryAddress"
                                value={values.deliveryAddress}
                                className="form-control"
                                placeholder="Your Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span className="error">
                                {errors.deliveryAddress && touched.deliveryAddress && errors.deliveryAddress}
                            </span>
                            <br />
                            <input
                                name="phone"
                                id="phone"
                                className="form-control"
                                value={values.phone}
                                placeholder="Your Mobile Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span className="error">
                                {errors.phone}
                            </span>
                            <br />
                            <select
                                name='paymentType'
                                id="paymentType"
                                className="form-control"
                                value={values.paymentType}
                                onBlur={handleBlur}
                                onChange={handleChange}>
                                <option>Select Payment Gateway</option>
                                <option value='Cash On Delivery'>Cash On Delivery</option>
                                <option value='Rocket'>Rocket</option>
                                <option value='Bkash'>Bkash</option>
                                <option value='Nagad'>Nagad</option>
                                <option value='Nexus'>Nexus</option>
                                <option value='Master'>Master</option>
                                <option value='VISA'>VISA</option>

                            </select>
                            <span className="error">
                                {errors.paymentType}
                            </span>
                            <br />
                            <Button type="submit" style={{ backgroundColor: '#d70f64' }} className="me-auto" disabled={!this.props.purchasable}>Place Order</Button>
                            <Button color="secondary" className="ms-1" onClick={this.goBack}>Cancel</Button>
                        </form>
                    )}
                </Formik>
            </div >
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