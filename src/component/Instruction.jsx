import React, {Fragment} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Copyright, useStyles} from "../constants/constant";

function Instruction(props) {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline/>
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    作業内容説明
                </Typography>

            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright/>
                </Container>
            </footer>
        </Fragment>
    )
}

export default Instruction