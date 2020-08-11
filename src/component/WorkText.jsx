import {withRouter} from "react-router";
import React, {Fragment, useEffect, useState} from "react";
import {Header} from "./Header";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {baseURL, tweetURL} from "../constants/constant";
import {fetch} from "whatwg-fetch";
import moment from "moment";
import ReactDOM from "react-dom";
import TweetDisplay from "./TweetDisplay";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 345,
        padding: '140px 0px',
        margin: '0 auto',
    },
    card: {
        margin: '160px 0px',
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

function WorkText(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        tweet_id: "1237308948216025093",
        text: "text",
        date: "date",
        tweet_user_name: "user_name",
        tweet_user_header: "U"
    });

    const [userInfo, setUserInfo] = useState({
        point: 0,
        count: 0,
        evaluated: 0,
        approved: 0,
        task_id: null
    })

    function handleLogout() {
        return null
    }

    function handleInstruction() {
        return null
    }

    const getTask = () => {

        const url = new URL(baseURL + '/get_work_tweet');
        url.searchParams.set('task_id', userInfo.task_id);
        url.searchParams.append('uid', this.props.user.uid);
        url.searchParams.append('client', this.props.user.client);
        url.searchParams.append('access-token', this.props.user.authtoken);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => {
            return r.json();
        }).then(r => {
                this.setState({tweet_id: r.id});
                ReactDOM.render(
                    <TweetDisplay id={r.id}/>
                    ,
                    document.getElementById('tweet'));
            }
        ).catch(r => {
            this.props.enqueueSnackbar('ツイートがもうありません', {variant: 'warning'})
        })
    }

    const getTweet = () => {
        const url = new URL(tweetURL + 'tweet_id');
        url.searchParams.append('tweet_id', values.tweet_id);
        fetch(url).then((r) => {
            return r.json();
        }).then((r) => {
                setValues(v => ({
                        ...v,
                        tweet_user_name: r.tweet.tweet_user.name,
                        tweet_user_header: r.tweet.tweet_user.name.charAt(0),
                        text: r.tweet.text,
                        date: moment(r.tweet.created_at).format('YYYY年M月D日 h時m分'),
                        point: 1
                    })
                )
            }
        ).catch((error) => {
            console.log(error)
            //this.props.enqueueSnackbar('ネットワークかサーバに問題があります' + error, {variant: 'error'})
        });
    };


    useEffect(() => {
        getTweet()
        console.log()
    }, [values.text, values.tweet_id, values.date, values.point])

    return (

        <Fragment>
            <Header logOut={handleLogout} point={userInfo.point} count={userInfo.count}
                    evaluated={userInfo.evaluated}
                    goInstruction={handleInstruction}
                    approved={userInfo.approved}
            />
            <Card className={classes.card}>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {values.tweet_user_header}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                            </IconButton>
                        }
                        title={values.tweet_user_name}
                        subheader={values.date}
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {values.text}({values.tweet_id})
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default withRouter(WorkText)