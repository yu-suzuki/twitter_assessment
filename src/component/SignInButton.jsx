import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router'

function SignInButton(props) {

    function handleSubmit() {
        props.history.push('/sign_in')
    }

    return(
        <Fragment>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                ログイン
            </Button>

        </Fragment>
    )
}

export default withRouter(SignInButton);