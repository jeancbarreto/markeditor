import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import actionsDocument from '../redux/actions/actionsDocument';
import { reducerDocument } from '../redux/reducers/reducerDocument'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import store from "../redux/store";
import '../index.css';
import Axios from "axios";

const styles = theme => ({
    button: {
        margin: theme.spacing(1)
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    }
});
const defaultState = "";


const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};



class viewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlNew : "",
            _items : [],
            open:false
        };

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            this.setState({
                _items: store.getState("payload")
            });

            this.setState({ htmlNew: this.state._items.reduceDocument[0].content})
        });
    }


    hadleSaveFile(event){
        var jsonNew = {"Document":[]}
        jsonNew.Document = this.state._items.reduceDocument;
        jsonNew.Document[0].name = "Documento_nuevo_"+ Date.now().toFixed() +"";
        jsonNew.Document[0].fecha_creacion = Date.now();
        

        //console.log("json ", JSON.stringify(jsonNew));
        Axios.post("http://192.168.0.15:3000/api/v1/document/add", JSON.stringify(jsonNew), config).then(result => {
            if (result.data.status === "Plano Updated."){
                alert("Se creo el archivo");
            }
        }).catch(error => {
            console.log("Error", error);
        })
    }

        

    componentWillMount() {
        
        this.setState({ htmlNew: this.props.reducerDocument });
        console.log("datos de redux ", this.props.reducerDocument);
    }


    componentDidMount() {
        //this.setState({ _actualizar: (this.state._datos === [] ? false : true) });
        this.setState({ htmlNew: this.props.reducerDocument });
        console.log("datos de redux ", this.state.htmlNew);
       
    }

     handleOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = styles;
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.htmlNew }}>
                
                </div>
                <Button variant="contained" color="primary" onClick={e => this.hadleSaveFile(e)} >
                    Guardar Documento
                </Button>
                <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div className="paper">
                            <Typography variant="h6" id="modal-title">
                                Text in a modal
                            </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                            
                        </div>
                    </Modal>
                </div>
            </div>
            
        );
    }
}

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



viewFile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(viewFile);