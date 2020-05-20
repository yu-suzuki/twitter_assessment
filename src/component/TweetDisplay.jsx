import React, {Fragment} from 'react'
import Tweet from "./Tweet";
import {tweetURL} from "../constants/constant"
import {fetch} from 'whatwg-fetch'
import moment from 'moment';
import ReactDOM from "react-dom";


function TweetDisplay (props) {
    if (typeof props.id === 'undefined') {
        console.log('undefined')

    } else {
        const url = new URL(tweetURL + 'tweet_id');
        url.searchParams.append('tweet_id', props.id);
        fetch(url).then((r) => {
            return r.json();
        }).then((r) => {
                const date = moment(r.tweet.created_at);
                ReactDOM.render(
                    <Fragment>
                        <Tweet text={r.tweet.text} name={r.tweet.tweet_user.name} date={date.format('YYYY年M月D日 h時m分')}/>
                    </Fragment>
                    ,
                    document.getElementById('tweet'));
            }
        ).catch((error) => {
            console.log(error)
            //this.props.enqueueSnackbar('ネットワークかサーバに問題があります' + error, {variant: 'error'})
        });
    }
    return null;
}

export default TweetDisplay
