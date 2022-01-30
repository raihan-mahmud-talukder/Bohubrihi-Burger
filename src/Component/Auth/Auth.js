import React, { Component } from "react";
import { Formik } from 'formik';
import { auth } from '../../redux/authAction'
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends Component {
    state = {
        mode: 'Sign Up'
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up' })
    }

    render() {
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: '',
                            password: '',
                            passwordConfirm: '',
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }
                    validate={
                        (values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid Email Address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            // else if (isNaN(values.password)) {
                            //     errors.password = 'Must be number';
                            // }
                            else if (values.password.length < 4) {
                                errors.password = 'Must be atleast 4 characters!';
                            }
                            if (this.state.mode === 'Sign Up') {
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';
                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Password does not match!';
                                }
                            }
                            console.log('Errors: ', errors);
                            return errors;
                        }
                    }
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{
                            border: '1px grey solid',
                            padding: '15px',
                            borderRadius: '7px',
                        }}>
                            <button style={{
                                width: '100%',
                                backgroundColor: '#d70f64',
                                color: 'white',
                            }}
                                className="btn btn-lg"
                                onClick={this.switchModeHandler}
                            >
                                Switch To {this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up'}
                            </button>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter Yous Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span className="error">
                                    {errors.email}
                                </span>
                                <br />
                                <input
                                    type='password'
                                    name="password"
                                    placeholder="password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span className="error">
                                    {errors.password}
                                </span>
                                <br />
                                {
                                    this.state.mode === 'Sign Up' ?
                                        <div>
                                            <input
                                                type='password'
                                                name="passwordConfirm"
                                                placeholder="Confirm Password"
                                                className="form-control"
                                                value={values.passwordConfirm}
                                                onChange={handleChange}
                                            />
                                            <span className="error">
                                                {errors.passwordConfirm}
                                            </span>
                                            <br />
                                        </div> : null
                                }
                                <button type="submit" className="btn btn-success">
                                    {this.state.mode === 'Sign Up' ? 'Sign Up' : 'Login'}
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
            )
        }
        return (
            <div>
                { form} 
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);