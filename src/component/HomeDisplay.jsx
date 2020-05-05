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
import {withRouter} from "react-router";

function HomeDisplay (props) {
    const classes = useStyles();
    function handleRegister() {
        props.history.push('/sign_up');
    }

    function handleSignIn() {
        props.history.push('/sign_in');
    }

    function handleResendPassword() {
        props.history.push('/resend_password');
    }

    return (
        <Fragment>
            <CssBaseline/>
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    開始画面
                </Typography>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start" onClick={handleRegister}>
                        <ListItemAvatar>
                            <Avatar alt="Aemy Sharp" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="登録"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        作業される方をシステムに登録してください
                                    </Typography>
                                    {" - 初回だけ"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start" onClick={handleSignIn}>
                        <ListItemAvatar>
                            <Avatar className={classes.green}>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="ログイン"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        作業開始はこちら
                                    </Typography>
                                    {" -- 登録が終わってから"}
                                </React.Fragment>
                            }

                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem alignItems="flex-start" onClick={handleResendPassword}>
                        <ListItemAvatar>
                            <Avatar className={classes.menuavatar}>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="パスワード更新"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        パスワードを変更します
                                    </Typography>
                                    {" -- もしパスワードを忘れてしまったら"}
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

export default withRouter(HomeDisplay)