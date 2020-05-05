import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button';
import {withSnackbar} from "notistack";

class SignOut extends Component {

    handleSubmit = () => {
        this.props.logout();
        this.props.history.push('/');
        this.props.enqueueSnackbar('ログアウト完了しました', {variant: 'success'})
    };


    render() {
        return (
            <Fragment>
                <Button variant="contained" color="primary"  onClick={this.handleSubmit} >
                    ログアウト
                </Button>
            </Fragment>
        )
    }
}

function logout() {
    return{
        type: 'LOGOUT'
    }
}

export default withSnackbar(connect(null, {logout})(withRouter(SignOut)));