import React, {Component, Fragment} from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import * as constantValue from "../constants/constant";
import {fetch} from "whatwg-fetch";
import * as queryString from "query-string";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";

class ChangePassword extends Component {

    submit(values) {
        const authURL = new URL(constantValue.baseURL + '/auth/password');
        const qs = queryString.parse(this.props.location.search);
        fetch(authURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'access-token': qs['access-token'],
                'client': qs['client'],
                'uid': qs['uid']
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) {
                this.props.history.push('/sign_in')
                this.props.enqueueSnackbar('パスワードは正常に変更されました', {variant: 'success'})
            } else {
                this.props.enqueueSnackbar('パスワード変更に失敗しました．二つのパスワードが同じか，8文字以上か確認してください．', {variant: 'error'})
            }
        }).catch((error) => {
            this.props.enqueueSnackbar('ネットワークにエラーが発生したかサーバがダウンしています', {variant: 'error'})
        })
    }

    render(){
        return(
            <Fragment>
                <ChangePasswordForm onSubmit={this.submit.bind(this)} />

            </Fragment>

        )
    }
}

export default withSnackbar(withRouter(ChangePassword))