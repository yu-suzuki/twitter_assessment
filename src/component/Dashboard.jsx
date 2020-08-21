import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import DashboardDisplay from "./DashboardDisplay";
import {checkPoint, checkUser} from "../modules/user_info";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: 0
        }
    }


    componentDidMount() {
        checkUser(this.props.user.uid, this.props.user.client, this.props.user.authtoken, this.props, true);
        this.setState({point: checkPoint(this.props.user.uid, this.props.user.work_id, this.props.user.client, this.props.user.authtoken )});
    }

    render() {
        return (
            <Fragment>
                <DashboardDisplay point={this.state.point}/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(withSnackbar(withRouter(Dashboard)));