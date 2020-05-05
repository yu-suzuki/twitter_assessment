import React, {Component} from "react";
import * as constantValue from '../constants/constant'
import {withRouter} from 'react-router'
import {fetch} from 'whatwg-fetch'
import {connect} from "react-redux";
import SignInForm from "./SignInForm";
import {withSnackbar} from "notistack";
import * as queryString from "query-string";

function login(authtoken, client) {
    return ({
        type: 'LOGIN',
        authtoken,
        client
    });
}

function setUserInfo(email, uid, name) {
    return ({
        type: 'SETUSER',
        email,
        uid,
        name
    });
}

class SignIn extends Component {
    submit(values) {
        const authURL = constantValue.baseURL + '/auth/sign_in';
        fetch(authURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.headers.map['access-token']) {
                this.props.login(
                    res.headers.map['access-token'],
                    res.headers.map['client'],
                );
            }
            return res.json();
        }).then((data) => {
            if (data.success === false) {
                data.errors.forEach((message) => {
                        this.props.enqueueSnackbar(message, {variant: 'error'})
                    }
                )
            } else {
                this.props.setUserInfo(
                    data.data.email,
                    data.data.uid,
                    data.data.name
                );
                this.props.enqueueSnackbar('ログイン完了しました', {variant: 'success'});
                this.props.history.push('/work_select');
            }
        }).catch((error) => {
            this.props.enqueueSnackbar('ネットワークかサーバに問題があります', {variant: 'error'})
        })
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        if(qs.account_confirmation_success === 'true'){
            this.props.enqueueSnackbar('メールアドレスを確認できました．ログインしてください', {variant: 'success'})
        }
    }

    render() {
        return <SignInForm onSubmit={this.submit.bind(this)}/>
    }
}

export default withSnackbar(withRouter(connect(null, {login, setUserInfo})(SignIn)))