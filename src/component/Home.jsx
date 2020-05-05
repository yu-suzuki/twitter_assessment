import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import HomeDisplay from "./HomeDisplay";
import {checkUser} from "../modules/user_info";

class Home extends Component {
    componentDidMount() {
        checkUser(this.props.user.uid,this.props.user.client,this.props.user.authtoken,this.props, false)
    }

    render() {
        return (
            <Fragment>
                <HomeDisplay/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withSnackbar(withRouter(Home)))