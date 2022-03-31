import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import GraphData from "./data/oekg-1.json";

function App() {
  const { useRef, useCallback } = React;
  const [oekg, setOekg] = React.useState(GraphData);
  const [relation, setRelation] = React.useState('');
  const [concept, setConcept] = React.useState('');

  const handleRelationChange = (event) => {
    setRelation(event.target.value);
  };

  const handleConceptChange = (event) => {
    setConcept(event.target.value);
  };

  const fgRef = useRef();

  const handleClick = node => {
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.centerAt(
    node.x,
    node.y,
    200
    );
    fgRef.current.zoom(50, 500);
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
           <Box sx={{ padding: 5, width: 400, height: 100 }}>
           <Typography variant="h4" gutterBottom component="div">
             Open Energy Knowledge Graph Viewer v0.0.1
           </Typography>

           </Box>

           <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 400,
                height: 500,
              },
            }}
            >
            <Paper elevation={4} sx={{ padding: 4, overflow: "auto" }}>



              <Typography variant="h6" gutterBottom component="div">
                OEO definition
              </Typography>

              <Typography variant="body2" gutterBottom>
                A study region is a spatial region that is under investigation and consists entirely of one or more subregions.
              </Typography>

              <Typography variant="h6" gutterBottom component="div">
                Example of usage
              </Typography>

              <Typography variant="body2" gutterBottom>
                In a study, the spatial focus of the investigation lies on one European country, e.g. Germany. This is the study region.
                The study region is not modelled as a whole, but several subregions are modelled, e.g. German Federal States. These are study subregions.
                In the study, a spatial region outside the study region plays a role. E.g. for modelling the electricity transfer between Germany and its neighbouring countries. In this example, the neighbouring countries represent the interacting / external region.
                The union of the study region and the interacting/ external region is the considered region.
              </Typography>

              <Typography variant="subtitle2" gutterBottom component="div">
                OEO link:   <a href="https://openenergy-platform.org/ontology/oeo/OEO_00020032">OEO_00020032</a>
              </Typography>

            </Paper>

           </Box>



           <Box sx={{ marginRight: 5, width: 400, height: 50 }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Relation</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={relation}
                  label="Relation"
                  onChange={handleRelationChange}
                >
                  <MenuItem value={10}>has part</MenuItem>
                  <MenuItem value={20}>is about</MenuItem>
                  <MenuItem value={30}>participates in</MenuItem>
                  <MenuItem value={30}>has participant</MenuItem>
                </Select>
            </FormControl>
           </Box>

           <Box sx={{ marginRight: 20, paddingTop: 2, width: 400, height: 50 }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Concept</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={concept}
                  label="Concept"
                  onChange={handleConceptChange}
                >
                  <MenuItem value={10}>model calculation</MenuItem>
                  <MenuItem value={20}>dataset</MenuItem>
                  <MenuItem value={30}>analysis scope</MenuItem>
                </Select>
            </FormControl>
           </Box>



           <Box sx={{ marginRight: 5, paddingTop: 2, width: 400, height: 50 }}>
              <TextField sx={{ m: 1, minWidth: 120 }} fullWidth id="outlined-basic" label="Value" variant="outlined" />
           </Box>

           <Box sx={{ marginRight: 5, paddingTop: 4, width: 400, height: 50 }}>
              <Button sx={{ m: 1, minWidth: 120 }} fullWidth variant="contained" color="success">
               Add to OEKG
             </Button>
           </Box>

      </Grid>
      <Grid item xs={9}>
        <div className="Playground">
          <ForceGraph2D
            graphData={oekg}
            backgroundColor={"#ffffff"}
            nodeOpacity={1}
            showNavInfo={false}
            nodeResolution={20}
            nodeAutoColorBy="group"
            nodeRelSize={5}
            nodeLabel="id"


            nodeVal={(node) => node.group}

            nodeCanvasObject={(node, ctx, globalScale) => {
                    const fontSize = node.size / 3.5;
                    ctx.font = `Bold ${fontSize}px Tahoma`;
                    ctx.fillStyle = node.size ? node.color : '#deeaee';

                    // circle
                    // ctx.beginPath();
                    // ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
                    // ctx.stroke();
                    // ctx.fill();

                    // hexagon
                    var numberOfSides = 6,
                        size = node.size,
                        Xcenter = node.x,
                        Ycenter = node.y;

                    ctx.beginPath();
                    ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

                    for (var i = 1; i <= numberOfSides;i += 1) {
                      ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
                      ctx.lineJoin = 'round';

                    }
                    ctx.closePath();

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = node.size ? node.color : '#deeaee';

                    ctx.strokeStyle = "#D9F4FC";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fill();

                    const label = node.id;
                    var lines = label.split(" ");

                    ctx.fillStyle = "#00688B";
                    if (lines.length == 1) {
                      ctx.fillText(lines[0], node.x, node.y )
                    } else {
                      for (var i = 0; i<lines.length; i++) {
                        if (i == 0) {
                          ctx.fillText(lines[i], node.x, node.y - 2 );
                        } else if (i == 1) {
                          ctx.fillText(lines[i], node.x, node.y + 1 );
                        } else {
                          ctx.fillText(lines[i], node.x, node.y + 2 );
                        }
                      }
                    }


                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(
                      n => n + fontSize * 6
                      ); // some padding
                      node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                    }}
                nodePointerAreaPaint={(node, color, ctx) => {
                  ctx.fillStyle = color;
                  const bckgDimensions = node.__bckgDimensions;
                  bckgDimensions &&
                    ctx.fillRect(
                      node.x - bckgDimensions[0] / 2,
                      node.y - bckgDimensions[1] / 2,
                      ...bckgDimensions
                    );
                }}

                //linkDirectionalArrowLength={(link) => link.arrowLength}
                linkDirectionalArrowRelPos={0.4}
                linkWidth={(link) => link.value}
                linkResolution={20}
                linkColor={() => "#00688B"}
                //linkCurvature={(link) => link.curvature }
                ref={fgRef}
                onNodeClick={node => handleClick(node)}
                d3VelocityDecay={0.01}
                cooldownTicks={100}
                onNodeDragEnd={node => {
                  node.fx = node.x;
                  node.fy = node.y;
                  node.fz = node.z;
                }}
            />
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
