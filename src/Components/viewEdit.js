import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import actionsDocument from '../redux/actions/actionsDocument'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux'
import store from "../redux/store";



const styles = theme => ({});

var data = require('./data.json');

const fs = require('fs');


const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

class viewEdit extends Component {
    constructor(props) {
        super(props);

        store.subscribe(() => {
            //console.log(store.getState());
        });
        this.state = {
            editorState: EditorState.createEmpty(),
        };


        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    handleChangeEditor(props){
        var html = document.getElementsByClassName("editorClassName")[0].innerHTML;
        var json = data.Document.map((text, indice) => {
            text.content = html;
            return text
        })

        store.dispatch({
            payload: json,
            type:"actionsDocument"
        })
    }

    

    onEditorStateChange(editorState) {
        this.setState({editorState});
    };

    componentWillMount() {
        this.setState({ htmlNew: this.props.reducerDocument });
        //console.log("datos de redux ", this.props.reducerDocument);
    }


    componentDidMount() {
        //this.setState({ _actualizar: (this.state._datos === [] ? false : true) });
        this.setState({ htmlNew: this.props.reducerDocument });
        //console.log("datos de redux ", this.state.htmlNew);

    }

    render() {
        
        const { editorState } = this.state;
        return (
           <div>
                <Editor
                    initialEditorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onChange={this.handleChangeEditor}
                />
            </div>
        );
    }
}

viewEdit.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(viewEdit);