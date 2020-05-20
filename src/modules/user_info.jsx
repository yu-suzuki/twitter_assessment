import * as constantValue from "../constants/constant";
import {fetch} from "whatwg-fetch";
import {baseURL} from "../constants/constant";
import ReactDOM from "react-dom";
import React, {Fragment} from "react";

export const initialState = {
    user: {
        isLoggedIn: false
    }
};

function orgRound(value, base) {
    return Math.round(value * base) / base;
}

export function checkPoint (uid, tid, client, access_token) {
    const url = new URL(baseURL+'/check_point');
    url.searchParams.append('uid', uid);
    url.searchParams.append('tid', tid);
    url.searchParams.append('client', client);
    url.searchParams.append('access-token', access_token);
    fetch(url).then((res) => {
       return res.json();
    }).then((res) => {
        console.log(res);
        ReactDOM.render(
            <Fragment>
                {res.count}
            </Fragment>
            ,
            document.getElementById('count'));
        ReactDOM.render(
            <Fragment>
                {orgRound(res.point,1)}
            </Fragment>
            ,
            document.getElementById('point'));
        return res
    });
};

export const checkUser = (uid, client, access_token, props, loginRequired) => {

    const authURL = new URL(constantValue.baseURL + '/auth/validate_token');
    authURL.searchParams.append('uid', uid);
    authURL.searchParams.append('client', client);
    authURL.searchParams.append('access-token', access_token);

    fetch(authURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((body) => {
        if(body.success && !loginRequired){
            props.enqueueSnackbar('ログイン済みです', {variant: 'warning'});
            props.history.push('/work_select')
        } else if (!body.success && loginRequired) {
            props.enqueueSnackbar('ログインしてください', {variant: 'warning'});
            props.history.push('/')
        }
        return body
    }).catch((error) => {
        props.enqueueSnackbar('ログインしてください', {variant: 'warning'});
        props.history.push('/')
        return {'success': false}
    });
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                authtoken: action.authtoken,
                isLoggedIn: true,
                client: action.client
            });
        case 'SETUSER':
            return Object.assign({}, state, {
                email: action.email,
                uid: action.uid,
                name: action.name
            });
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                authtoken: null,
                client: null,
                email: null,
                uid: null,
                name: null
            };
        case 'SETWORKID':
            console.log(action.work_id)
            return Object.assign({}, state, {
                work_id: action.work_id,
                work_title: action.work_title
            });
        case 'UNSETWORKID':
            return {
                work_id: null,
                work_title: null
            };
        default:
            return state;

    }
}
