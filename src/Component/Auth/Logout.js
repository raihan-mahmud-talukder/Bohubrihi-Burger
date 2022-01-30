import { Component } from "react";
import { Navigate } from "react-router";
import { connect } from "react-redux";
import { logout } from "../../redux/authAction";

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <Navigate replace to='/' />
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout)