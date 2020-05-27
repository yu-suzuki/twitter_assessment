import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Header} from "./Header";
import {withSnackbar} from "notistack";
import {checkPoint} from "../modules/user_info";
import SelectButton from "./SelectButton";
import TweetDisplay from "./TweetDisplay";
import {baseURL} from "../constants/constant";
import {fetch} from "whatwg-fetch";


class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select_options: [],
            id: '',
            tweet_id: '',
            point: 0,
            count: 0
        };
        this.changeTweet = this.changeTweet.bind(this);
    }

    setError = (message, level) => {
        this.props.enqueueSnackbar(message, level);
    };

    getTweet = (user) => {
        const url = new URL(baseURL + '/get_work_tweet');
        url.searchParams.set('task_id', user.work_id);
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
    };

    handleClick = (props) => {
        if (props === 'return') {
            this.showAssessmentOptions()
        } else {
            const index = this.state.options.findIndex((v) => v.id === props);
            const op = this.state.options[index];
            if (typeof op === 'undefined' || op.options.length === 0) {
                const body = {
                    task: {
                        tweet_id: this.state.tweet_id,
                        assessment_id: props,
                        uid: this.props.user.uid,
                        task_id: this.props.user.work_id,
                    }
                };
                let url = new URL(baseURL + '/submit_assessment');
                url.searchParams.append('uid', this.props.user.uid);
                url.searchParams.append('client', this.props.user.client);
                url.searchParams.append('access-token', this.props.user.authtoken);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(r => {
                    return r.json();
                }).then(r => {
                    if(typeof r.id === 'undefined') {
                        this.props.enqueueSnackbar('作業対象のツイートがありません．しばらくお待ちください', {variant: 'error'})
                        this.props.history.push('/dashboard')
                    } else{
                        this.setState({tweet_id: r.id});
                        this.showAssessmentOptions();
                        ReactDOM.render(
                            <TweetDisplay id={r.id}/>
                            ,
                            document.getElementById('tweet'));
                    }
                    this.updateUserStatus()
                }).catch(r => {
                    this.props.enqueueSnackbar('サーバのエラーです．しばらくお待ちください', {variant: 'error'})
                });

            } else {
                this.showAssessmentOptions(props)
            }
        }
    };


    getAssessmentOptions = (user) => {
        const url = new URL(baseURL + '/task_option');
        url.searchParams.set('id', user.work_id);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => {
            return r.json();
        }).then(r => {
                this.setState({options: r.assessment_options});
                this.showAssessmentOptions();
            }
        );
        return undefined;
    };

    showAssessmentOptions(id) {
        if (typeof id === 'undefined' || id === null) {
            ReactDOM.render(
                <SelectButton options={this.state.options} type={'primary'} handleClick={this.handleClick}/>
                ,
                document.getElementById('select_button'));
        } else {
            const index = this.state.options.findIndex((v) => v.id === id);
            console.log(this.state.options[index])
            ReactDOM.render(
                <SelectButton options={this.state.options[index].options} type={'secondary'}
                              handleClick={this.handleClick}/>
                ,
                document.getElementById('select_button'));
        }
    }

    changeTweet = () => {
        this.getTweet(this.props.user);
        this.showAssessmentOptions();
    };

    handleLogout = () => {
        this.props.history.push('/dashboard')
    };

    handleInstruction = () => {
        this.props.history.push('/instruction')
    }

    updateUserStatus(){
        const user = this.props.user;
        const url = new URL(baseURL+'/check_point');
        url.searchParams.append('uid', user.uid);
        url.searchParams.append('tid', user.work_id);
        url.searchParams.append('client', user.client);
        url.searchParams.append('access-token', user.authtoken);
        fetch(url).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res)
            let a = this.state
            a.point = res.point
            a.count = res.count
            this.setState(a)
        })
    }

    componentDidMount()  {
        const user = this.props.user;
        this.getAssessmentOptions(user);
        this.getTweet(user);
        this.updateUserStatus();
    }

    render() {
        return (
            <Fragment>
                <Header logOut={this.handleLogout} point={this.state.point} count={this.state.count}
                        goInstruction={this.handleInstruction}/>
                <div id="tweet"/>
                <div id="select_button"/>
            </Fragment>
        )
    }

    GoHome() {
        this.props.enqueueSnackbar('ログインしていません．開始画面に移動します', {variant: 'warning'});
        this.props.history.push('/');
        return null;
    }
}

function mapStateToProps(state) {
    return (
        {user: state.user}
    )
}

export default connect(mapStateToProps)(withSnackbar(withRouter(Work)))