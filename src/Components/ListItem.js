import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import actionsDocument from '../redux/actions/actionsDocument'
import Description from '@material-ui/icons/Description';
import axios from "axios";
import { connect } from 'react-redux';
import store from "../redux/store";



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        marginLeft: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        width: '100%'
    },
    buttonUpload: {
        width: '100%'
    }
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

var data = require('./data.json');



class Item extends Component {
    constructor(props) {
        super(props);

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            this.setState({
                _items: store.getState("payload")
            });

            //this.setState({ htmlNew: this.state._items.reduceDocument[0].content })
            console.log("reducer ", this.state._items.reduceDocument[0].content);
        });

        this.state = {
            listMeun : [],
            htmlNew : "",
            _items : []
        };
        this.handleAllItem();
    }

    handleAllItem(){
        axios.get("http://192.168.0.15:3000/api/v1/document/all").then(result => {
            if(result.data !== undefined){
                let json = {Document:[]}
                json.Document = result.data.data.Document;
                
                json.Document.map((text, indices) => {
                    json.Document[indices] = JSON.parse(text);
                })

                this.setState({ listMeun: json.Document});
                console.log("json ", this.state.listMeun)
            }
        }).catch(error => {
            console.log("Error ", error);
        })
    }

    handleClicChangeDocument(nombre, event) {
        
        var json = data.Document.map((text, indices) => {
            if(text.name === nombre){
                return text
            }
        })

        
    }

    render() {
        const { classes } = this.props;
        return (
            <List>
                {this.state.listMeun.map(
                    (text, index) => (
                        <ListItem button key={index} onClick={e => this.handleClicChangeDocument(text.name, e)} >
                            <ListItemIcon>
                                <Description />
                            </ListItemIcon>
                            <ListItemText primary={text.name + " " + text.fecha_creacion}/>
                        </ListItem>
                    )
                )}
            </List>
        );
    }
}

Item.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        reducerDocument: state.reducerDocument
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionsDocument: (value) => dispatch(actionsDocument(value))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Item);