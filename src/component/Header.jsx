import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {useStyles} from "../constants/constant";
import Grid from "@material-ui/core/Grid";

export function Header(props) {
    console.log(props)
    const classes = useStyles();

    function handleLogout() {
        props.logOut()
    }

    function handleInstruction() {
        props.goInstruction()
    }

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                    <Typography variant="h6" className={classes.title}>
                        <span id={'count'} className={classes.bold} >{props.count}</span>件,
                        <span id={'point'} className={classes.bold} >{props.point}</span>pt
                    </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button color="inherit" onClick={handleInstruction}>作業説明</Button>
                        <Button color="inherit" onClick={handleLogout}>終了</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(withRouter(Header));