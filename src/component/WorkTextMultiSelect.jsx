import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import {Field, Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "formik-material-ui";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    Button: {
        float: 'right'
    }
}));


function WorkTextMultiSelect(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const {gilad, jason, antoine} = state;

    return (
        <Formik
            initialValues={{
                gilad: true,
                jason: false,
                antoine: false,
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 500);
            }}
        >
            {({submitForm, isSubmitting, errors}) => (
                <Form>
                    <Box>
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">{props.text}</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Field component={Checkbox}  type="checkbox" checked={gilad} onChange={handleChange} name="gilad" />}
                                    label="Gilad Gray"
                                />
                                <FormControlLabel
                                    control={<Field component={Checkbox}  type="checkbox" checked={jason} onChange={handleChange} name="jason" />}
                                    label="Jason Killian"
                                />
                                <FormControlLabel
                                    control={<Field component={Checkbox}  type="checkbox" checked={antoine} onChange={handleChange} name="antoine" />}
                                    label="Antoine Llorca"
                                />
                            </FormGroup>
                            <FormHelperText>似ているものをクリックしてください</FormHelperText>
                        </FormControl>

                    </div>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            className={classes.Button}
                        >
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default WorkTextMultiSelect