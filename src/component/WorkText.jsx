import {withRouter} from "react-router";
import React, {Fragment, useCallback, useEffect, useState} from "react";
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
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import WorkTextQuestion from "./WorkTextQuestion";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 345,
        padding: '0px 0px 0px 0px',
        margin: '0px',
        display: 'flex',
        flexWrap: 'wrap',
        zIndex: theme.zIndex.drawer,
    },
    card: {
        padding: '0px 0px 600px 0px',
        margin: '90px 0 0 0px',
        whiteSpace: 'pre-line',
        zIndex: theme.zIndex.drawer,
    },
    avatar: {
        backgroundColor: red[500],

    },
    appBar: {
        top: 'auto',
        bottom: theme.spacing(0),
        zIndex: theme.zIndex.drawer + 100,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: '0px 0px',
        margin: '0 auto',
        width: 200,
    },
    Button: {
        "margin": "16px auto",
    }
}));

function WorkText(props) {
    const [answer, setAnswer] = useState({})

    const classes = useStyles();
    const [tweetID, setTweetID] = useState("1270800417840959488")
    const [values, setValues] = useState({
        text: "text",
        date: "date",
        tweet_user_name: "user_name",
        tweet_user_header: "U"
    });
    const [questions, setQuestions] = useState([{
            text: '事実確認できること',
            type: 'text'
        },
        {
            text: '事実「' + answer.fact + '」は以下の事実と似ていますか？',
            type: 'multi_select'
        },
        {
            text: '事実確認できるURL',
            type: 'text'
        }])
    const [step, setStep] = useState(0)

    const [userInfo, setUserInfo] = useState({
        point: 0,
        count: 0,
        evaluated: 0,
        approved: 0,
    })


    function handleLogout() {
        return null
    }

    function handleInstruction() {
        return null
    }

    const getTweet = useCallback(
        () => {
            const url = new URL(tweetURL + 'tweet_id');
            url.searchParams.append('tweet_id', String(tweetID));
            fetch(url).then((r) => {
                return r.json();
            }).then((r) => {
                    setValues(v => ({
                        ...v,
                        tweet_user_name: r.tweet.tweet_user.name,
                        tweet_user_header: r.tweet.tweet_user.name.charAt(0),
                        text: r.tweet.text,
                        date: moment(r.tweet.created_at).format('YYYY年M月D日 h時m分'),
                    }))
                }
            ).catch((error) => {
                console.log(error)
                this.props.enqueueSnackbar('ネットワークかサーバに問題があります' + error, {variant: 'error'})
            });
        }
        , [tweetID])

    const getTask = useCallback(
        () => {
            const url = new URL(baseURL + '/get_work_tweet');
            url.searchParams.set('task_id', props.user.work_id);
            url.searchParams.append('uid', props.user.uid);
            url.searchParams.append('client', props.user.client);
            url.searchParams.append('access-token', props.user.authtoken);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                return r.json();
            }).then(r => {
                    setTweetID(r.id)
                    getTweet()
                }
            ).catch(r => {
                this.props.enqueueSnackbar('ツイートがもうありません', {variant: 'warning'})
            })
        }
        , [getTweet, props.user.authtoken, props.user.client, props.user.uid, props.user.work_id])


    const getQuestion = () => {
        let url = new URL(baseURL + '/get_questions');
        url.searchParams.set('task_id', props.user.work_id);

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => {
            return r.json()
        }).then(r => {
            setQuestions(r.questions)
        });
    }

    useEffect(() => {
        getTask()
    }, [getTask])

    useEffect(() => {
        getQuestion()
    }, [getQuestion])

    function handleClick(value) {
        console.log('click ' + JSON.stringify(value))
        switch (step) {
            case 0:
                let f = answer
                f.fact = String(value.text)
                setAnswer(f);
                break;
            default:
                break;
        }
        if (step >= 2) {
            setStep(0)
            getTask()
        } else {
            setStep(step + 1)
        }

    }

    function handleBack() {
        if (step > 0) {
            setStep(step - 1);
        }
    }

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
                        {values.text}
                    </Typography>
                </CardContent>
            </Card>
            <AppBar position="fixed" className={classes.appBar} color={"inherit"}>
                <Toolbar>
                    <WorkTextQuestion step={step} question={questions[step]} answer={answer}
                                      handleClick={(v) => handleClick(v)} handleBack={() => handleBack()}/>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return (
        {user: state.user}
    )
}

export default connect(mapStateToProps)(withRouter(WorkText))