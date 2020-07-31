import {useStyles} from "../constants/constant";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import React, {Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";


function WorkItemList(props) {
    const classes = useStyles();
    let list = [];

    props.worklist.tasks.map((r) => {
            console.log(r)
            if (r.available === true) {
                list.push(
                    <Fragment key={r.id}>
                        <ListItem alignItems="flex-start" key={r.id} onClick={() => props.handleClick(r)}>
                            <ListItemAvatar>
                                <Avatar key={r.id}>{r.id}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={r.name}
                                key={r.id}
                                secondary={
                                    <Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {r.subtitle}
                                        </Typography>
                                        {"--"}
                                    </Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </Fragment>
                )
            }
            return list;
        }
    )

    return (
        <Fragment>
            <CssBaseline/>
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    作業選択
                </Typography>
                <List className={classes.root}>
                    {list}

                </List>
            </Container>
        </Fragment>
    )
}

export default WorkItemList