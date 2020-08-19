import {Field, Form, Formik} from "formik";
import LinearProgress from "@material-ui/core/LinearProgress";
import {TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    textField: {
        float: 'left'

    },
    Button: {
        float: 'right'
    }
}));

function WorkTextInputText(props) {
    const classes = useStyles();

    return (
        <Fragment>
            <Box width={1} p={1} my={0.5}>
                <Formik
                    width={1}
                    initialValues={{text: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            props.onClick(values);
                        }, 500);
                    }}
                >
                    {({submitForm, isSubmitting}
                    ) => (

                        <Form width={1}>
                            {isSubmitting && <LinearProgress/>}

                            <Box width={1}>
                                <Field
                                    component={TextField}
                                    name={"text"}
                                    label={'Step' + props.text}
                                    type="text"
                                    placeholder={props.text}
                                    margin="normal"
                                    autoFocus
                                    fullWidth
                                    disabled={isSubmitting}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required={true}
                                    className={classes.textField}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                className={classes.Button}
                            >
                                送信
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Fragment>
    )
}

export default WorkTextInputText