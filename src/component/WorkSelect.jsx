import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {checkUser} from "../modules/user_info";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router";
import {baseURL} from "../constants/constant";
import ReactDOM from "react-dom";
import WorkItemList from "./WorkItemList";


function setWorkID(work_id, work_title) {
    return ({
        type: 'SETWORKID',
        work_id,
        work_title
    });
}


class WorkSelect extends Component {
    handleClick(r, t) {
        this.props.setWorkID(r, t);
        this.props.history.push('/dashboard')
    }

    componentDidMount() {
        checkUser(this.props.user.uid, this.props.user.client, this.props.user.authtoken, this.props, true);

        let url = new URL(baseURL + '/show_all_tasks');

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => {
            return r.json()
        }).then(r => {
            ReactDOM.render(
                <WorkItemList item_list={r} handleClick={this.handleClick.bind(this)}/>
                ,
                document.getElementById('work_select'));
        });
    }

    render() {
        return (
            <Fragment>
                <div id="work_select"/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        a: state
    }
}

export default (withSnackbar(withRouter(connect(mapStateToProps, {setWorkID})(WorkSelect))));