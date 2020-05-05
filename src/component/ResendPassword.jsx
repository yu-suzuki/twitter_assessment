import React, {Component, Fragment} from "react";
import * as constantValue from '../constants/constant'
import {withRouter} from 'react-router'
import {fetch} from 'whatwg-fetch'
import ResendPasswordForm from "./ResendPasswordForm";
import {withSnackbar} from "notistack";

class ResendPassword extends Component {

    submit(values) {
        const authURL = constantValue.baseURL + '/auth/password';
        console.log(values)
        fetch(authURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((res) => {
                console.log(res);
                this.props.enqueueSnackbar('メールアドレスが登録されている場合にはメールをお送りします', {variant: 'success'})
            }
        ).catch((error) => {
            console.log(error);
        })
    };


    render() {
        return (
            <Fragment>
                <ResendPasswordForm onSubmit={this.submit.bind(this)}/>
            </Fragment>

        )
    }
}

export default withSnackbar(withRouter(ResendPassword));