import React from 'react';
import logo from './logo.svg';
import Menu from './Components/Menu';
import ViewEdit from './Components/viewEdit';
import ViewFile from './Components/viewFile';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu/>
        <Grid container spacing={16}  alignItems={"center"} item lg={12} style={{"marginTop":"5%"}}>
          <Grid item sm={6} xs={12} justify={"flex-start"} className="editorText">
            <ViewEdit />
          </Grid>
          <Grid item sm={6} xs={12} justify={"flex-start"} className="editorText">
            <ViewFile />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
