import {Copyright, useStyles} from "../constants/constant";
import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Field, reduxForm} from "redux-form";

let SignInForm = props => {
    const classes = useStyles();
    const {handleSubmit} = props;
    const renderTextField = ({
                                 input,
                                 label,
                                 autoComplete,
                                 autoFocusFlag,
                                 meta: {touched, error},
                                 ...custom
                             }) => (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={label}
            name={label}
            autoComplete={autoComplete}
            {...input}
            {...custom}
        />
    );

    return (
        <Fragment>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ログイン
                        </Typography>
                        <Typography variant="body2">
                            Emailとパスワードを入力してログインしてください．
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <Field name="email" component={renderTextField} label="Email"
                                   autoComplete="email" type="email" autoFocus/>
                            <Field name="password" component={renderTextField} label="パスワード"
                                   autoComplete="password" type="password"/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                ログイン
                            </Button>

                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Fragment>

    )
};

export default reduxForm({form: 'signin'})(SignInForm);
