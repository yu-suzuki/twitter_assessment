import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {checkUser} from "../modules/user_info";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router";
import {baseURL} from "../constants/constant";
import WorkItemList from "./WorkItemList";


function setWorkID(work_id, work_title) {
    return ({
        type: 'SETWORKID',
        work_id,
        work_title
    });
}


class WorkSelect extends Component {
    handleClick = (i) => {
        this.props.setWorkID(i.id, i.name);
        this.props.history.push('/dashboard')
    }

    constructor(props) {
        super(props);
        this.state = {
            worklist: {
                tasks: []
            }
        }
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
            let a = this.state
            a.worklist = r
           this.setState(a)
        });
    }

    render() {
        return (
            <Fragment>
                <WorkItemList worklist={this.state.worklist} handleClick={(i) => this.handleClick(i)}/>
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