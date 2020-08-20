import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import WorkTextInputText from "./WorkTextInputText";
import WorkTextMultiSelect from "./WorkTextMultiSelect";

function WorkTextQuestion(props) {
    console.log(props)
    const q = props.question

    if (q.type === 'text') {
        return (
            <Fragment>
                <WorkTextInputText text={q.text} onClick={(v) => props.handleClick(v)}/>
            </Fragment>
        )
    } else if (q.type === 'multi_select') {
        return (
            <Fragment>
                <WorkTextMultiSelect text={q.text} answer={props.answer} onClick={(v) => props.handleClick(v)}/>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                {q.text}
                <Button variant="contained" color="primary" size="large" onClick={props.handleClick}
                        style={{margin: '0 0 0 auto'}}>次へ</Button>
            </Fragment>
        )
    }

}

export default WorkTextQuestion