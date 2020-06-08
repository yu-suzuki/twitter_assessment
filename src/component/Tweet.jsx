import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 345,
        padding: '140px 0px',
        margin: '0 auto',
    },
    card: {
        margin: 0,
        whiteSpace: 'pre-line'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    let headLetter = '';
    if (typeof props.name === 'undefined' || props.name === null){
        headLetter = 'U'
    } else {
        headLetter = props.name.charAt(0);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {headLetter}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                            </IconButton>
                        }
                        title={props.name}
                        subheader={props.date}
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                         {props.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}