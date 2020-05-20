import React, {Fragment} from "react";
import {useStyles} from "../constants/constant";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BeenhereSharpIcon from '@material-ui/icons/BeenhereSharp';
import {LooksOne, LooksTwo, Looks3, Looks4, Looks5, Looks6,
    Filter1Sharp, Filter2Sharp, Filter3Sharp, Filter4Sharp, Filter5Sharp, Filter6Sharp, Reply } from '@material-ui/icons';

function SelectButton(props) {
    const classes = useStyles();

    let list = [];
    console.log(props)

    props.options.map((data, index) => {
        let iconType = '';
        switch(props.type) {
            case 'primary':
                switch (index) {
                    case 0:
                        iconType = <LooksOne/>;
                        break;
                    case 1:
                        iconType = <LooksTwo/>;
                        break;
                    case 2:
                        iconType = <Looks3/>;
                        break;
                    case 3:
                        iconType = <Looks4/>;
                        break;
                    case 4:
                        iconType = <Looks5/>;
                        break;
                    case 5:
                        iconType = <Looks6/>;
                        break;
                    default:
                        iconType = <BeenhereSharpIcon/>;
                        break;
                }
                break;
            case 'secondary': {
                switch (index) {
                    case 0:
                        iconType = <Filter1Sharp />;
                        break;
                    case 1:
                        iconType = <Filter2Sharp/>;
                        break;
                    case 2:
                        iconType = <Filter3Sharp/>;
                        break;
                    case 3:
                        iconType = <Filter4Sharp/>;
                        break;
                    case 4:
                        iconType = <Filter5Sharp/>;
                        break;
                    case 5:
                        iconType = <Filter6Sharp/>;
                        break;
                    default:
                        iconType = <BeenhereSharpIcon/>;
                        break;
                }
                break;
            }
            default:
                break;
        }


        list.push(
            <BottomNavigationAction key={data.id} label={data.name} icon={iconType}
                                    onClick={() => props.handleClick(data.id)}/>
        );

        return null;
    });
    if(props.type === 'secondary'){
        list.push(
            <BottomNavigationAction key={9} label={'戻る'} icon={<Reply />}
                                    onClick={() => props.handleClick('return')}/>
        );
    }


    return (
        <Fragment>
            <BottomNavigation
                showLabels
                className={classes.stickToBottom}
            >
                {list}
            </BottomNavigation>
        </Fragment>
    );
}

export default SelectButton