import React, {Component, Fragment} from "react";
import * as constantValue from '../constants/constant'
import {withRouter} from 'react-router'
import {fetch} from 'whatwg-fetch'
import SignUpForm from "./SignUpForm";
import {withSnackbar} from "notistack";

class SignUp extends Component {

    submit(values) {
        const authURL = constantValue.baseURL + '/auth';
        fetch(authURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            return res.json()
        }).then((data) => {
            if (data.status === "success") {
                this.props.enqueueSnackbar('確認メールを送付しました', {variant: 'success'})
                this.props.history.push('/sign_in')
            } else if (data.status === "error") {
                data.errors.full_messages.forEach((message)=> {
                    this.props.enqueueSnackbar(message, {variant: 'error'})
                })
            }
        }).catch((error) => {
            console.log(error);
            this.props.enqueueSnackbar('ネットワークかサーバに問題があります', {variant: 'error'})
        })
    }

    render() {
        return (
            <Fragment>
                <SignUpForm onSubmit={this.submit.bind(this)}/>
            </Fragment>

        )
    }
}

export default withSnackbar(withRouter(SignUp));