import React from "react";
import Grid from '@mui/material/Grid';
import GraphData from "./data/oekg-1.json";

import Factsheet from './components/Factsheet_builder.js'
import CustomCard from './components/customCard.js'

import './styles/App.css';

function App() {

  const [oekgMain, setOekgMain] = React.useState(GraphData);
  const [fs, setFs] = React.useState();

  const handleSave = (newGraph) => {
    setOekgMain(newGraph);
  };

  const handleNewFactsheet = (fs) => {
    setFs(fs);
  };

  return (
      <div >
        <Grid container spacing={2} >
          {!fs && <Grid container style={{ 'padding' : '200px' }}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
              <CustomCard top_img="kg-card-6.png" title="Factsheets" create_new={handleNewFactsheet} create_new_button={true} />
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>}
          {fs && <Grid item xs={12}>
            <Factsheet graphData={oekgMain} onChange={handleSave} />
          </Grid>}
      </Grid>
    </div>
  );
}

export default App;
