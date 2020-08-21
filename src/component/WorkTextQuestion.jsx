import React, {Fragment} from "react";
import WorkTextInputText from "./WorkTextInputText";
import WorkTextMultiSelect from "./WorkTextMultiSelect";

function WorkTextQuestion(props) {
    const q = props.question

    if (q.type === 'text') {
        return (
            <Fragment>
                <WorkTextInputText text={q.text} onClick={(v) => props.handleClick(v)} step={props.step}/>
            </Fragment>
        )
    } else if (q.type === 'multi_select') {
        return (
            <Fragment>
                <WorkTextMultiSelect text={q.text} step={props.step} answer={props.answer} onClick={(v) => props.handleClick(v)} handleBack={() => props.handleBack()}/>
            </Fragment>
        )
    } else {
        return (
            <Fragment />
        )
    }

}

export default WorkTextQuestion