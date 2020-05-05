import React, {Fragment} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Copyright, useStyles} from "../constants/constant";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function DashboardDisplay (props) {
    const classes = useStyles();

    function handleStart() {
        props.history.push('/work');
    }

    function handleInstruction() {
        props.history.push('/instruction');
    }

    function handleSignOut() {
        props.logout();
        props.history.push('/');
        props.enqueueSnackbar('ログアウト完了しました', {variant: 'success'})
    }

    function handleWorkSelect() {
        props.history.push('/work_select');
    }

    return (
        <Fragment>
            <CssBaseline/>
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    作業画面
                </Typography>
                <Typography variant="body1"><span className={classes.bold}>{props.user.name}</span> さん．
                    <span className={classes.bold}>{props.user.work_title}</span>の作業です．
                    現在<span id={'count'} className={classes.bold} />件の作業が完了しており，<span id={'point'} className={classes.bold} />ポイント獲得しています．</Typography>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start" onClick={handleInstruction}>
                        <ListItemAvatar>
                            <Avatar alt="1" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="作業内容説明"
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        今回の作業内容を説明します
                                    </Typography>
                                    {" - 一度は必ず読んでください"}
                                </Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start" onClick={handleStart}>
                        <ListItemAvatar>
                            <Avatar alt="2" src="/static/images/avatar/2.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="作業開始"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        実際の作業画面です
                                    </Typography>
                                    {" -- ここから作業を開始してください"}
                                </React.Fragment>
                            }

                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start" onClick={handleSignOut}>
                        <ListItemAvatar>
                            <Avatar alt="3" src="/static/images/avatar/3.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="ログアウト"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        作業を終了します
                                    </Typography>
                                    {' — おつかれさまでした'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start" onClick={handleWorkSelect}>
                        <ListItemAvatar>
                            <Avatar alt="4" src="/static/images/avatar/3.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="作業を変更する"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        今選択している作業とは違う作業を行う
                                    </Typography>
                                    {' — 作業選択画面に戻ります'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright/>
                </Container>
            </footer>
        </Fragment>
    )
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function logout() {
    return {
        type: 'LOGOUT'
    }
}

export default connect(mapStateToProps,{logout})(withSnackbar(withRouter(DashboardDisplay)))