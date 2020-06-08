import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

export const baseURL = process.env.REACT_APP_SYSTEM_API_URL;
export const tweetURL = process.env.REACT_APP_TWEET_API_URL;

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://www.db.info.gifu-u.ac.jp/" to='#'>
                Suzuki Lab, Gifu University
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    menuavater: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    card: {
        margin: 0,
        whiteSpace: 'pre-line'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    bold: {
        fontWeight: 'bold'
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 10,
    },
    selected: {
        color: theme.palette.secondary.main
    },
}));
