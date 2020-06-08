import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {useStyles} from "../constants/constant";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

export function Header(props) {
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
                <Toolbar  variant="dense">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Box p={1}>
                            <Typography variant="overline" className={classes.title} align={'center'}>
                                作業済
                            </Typography>
                            <Typography variant="h5" className={classes.title} align={'center'}>
                                <span id={'count'} className={classes.bold}>{props.count}</span>
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant="overline" className={classes.title} align={'center'}>
                                評価済
                            </Typography>
                            <Typography variant="h5" className={classes.title} align={'center'}>
                                <span id={'count'} className={classes.bold}>{props.evaluated}</span>
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant="overline" className={classes.title} align={'center'}>
                                獲得pt
                            </Typography>
                            <Typography variant="h5" className={classes.title} align={'center'}>
                                <span id={'point'} className={classes.bold} variant="h5">{props.point}</span>
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant="overline" className={classes.title} align={'center'}>
                                未承認pt
                            </Typography>
                            <Typography variant="h5" className={classes.title} align={'center'}>
                                <span id={'count'} className={classes.bold}>{props.point - props.approved}</span>
                            </Typography>
                        </Box>
                    </Grid>

                </Toolbar>
                <Toolbar variant="dense">
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button color="inherit" onClick={handleInstruction}>説明</Button>
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