import React, {Fragment, useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {baseURL, Copyright, useStyles} from "../constants/constant";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router";

function Instruction(props) {
    const classes = useStyles();
    const [value, setValue] = useState({name: '', instructions: ['']})
    const id=props.user.work_id

    useEffect(() => {
        const url = new URL(baseURL + '/show_instruction?id=' + id)
        fetch(url).then(r => {
            return r.json()
        }).then(r => {
            setValue(r)
            console.log(r)
        })
    }, [id])

    function handleClick () {
        props.history.push('/work')
    }

    return (<Fragment>
        <CssBaseline/>
        <Container component="main" className={classes.main} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
                作業内容説明
            </Typography>
            {value.instructions.map((r, index) => {
                return (
                    <Fragment key={`f_${index}`}>
                        <div key={`text_${index}`}
                             dangerouslySetInnerHTML={{__html: r.text ? r.text : ''}}/>
                    </Fragment>
                )
            })}


            <Button key={'gowork'} variant="outlined" type="button"
                    onClick={() => handleClick()}>作業へ</Button>
        </Container>
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Copyright/>
            </Container>
        </footer>
    </Fragment>)
}

function mapStateToProps(state) {
    return (
        {user: state.user}
    )
}

export default connect(mapStateToProps)(withRouter(Instruction))