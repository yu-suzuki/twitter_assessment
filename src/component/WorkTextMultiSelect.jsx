import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import {Field, Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "formik-material-ui";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    Button: {
        float: 'right',
        margin: theme.spacing(2)
    },
    Form: {
        flexGrow: 1,
    }
}));


function WorkTextMultiSelect(props) {
    const classes = useStyles();
    const initialState = () => {
        let a = {}
        props.answer.other_answers.forEach(b => {
            a[b.fact]= false;
        })
        return a;
    }

    const [state, setState] = React.useState(initialState());



    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    function Checkboxes() {
        return Object.keys(state).map(a => {
            return (
                <FormControlLabel
                    control={<Field component={Checkbox} type="checkbox" key={a} checked={state[a]}
                                    onChange={handleChange} name={a} />}  key={a} label={a} />
            )
        })
    }

    return (
        <Formik
            initialValues={state}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values)
                setTimeout(() => {
                    setSubmitting(false);
                    props.onClick(state);
                }, 500);
            }}
            width={1}
        >
            {({submitForm, isSubmitting, errors}) => (
                <Form className={classes.Form}>
                    <Box width={1}>
                        {isSubmitting && <LinearProgress/>}
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={props.handleBack}
                            className={classes.Button}
                        >
                            戻る
                        </Button>
                        <div className={classes.root}>
                            <FormControl component="fieldset" className={classes.formControl} fullWidth={true}>
                                <FormLabel component="legend">{props.text}</FormLabel>
                                <FormGroup>
                                    {Checkboxes()}
                                </FormGroup>
                            </FormControl>

                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            className={classes.Button}
                        >
                            選択
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default WorkTextMultiSelect