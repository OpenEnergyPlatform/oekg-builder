import React, { useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FeedIcon from '@mui/icons-material/Feed';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import DraftsIcon from '@mui/icons-material/Drafts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';


import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { useTheme } from '@mui/material/styles';
import useMouse from '@react-hook/mouse-position';

import CustomSearchInput from "./customSearchInput.js";
import CustomSwap from './customSwapButton.js';
import CustomTabs from './customTabs.js';
import '../styles/App.css';

import CustomAutocomplete from './customAutocomplete.js';


import OEKG_Schema from "../data/oekg-schema.json";
import Checkbox from '@mui/material/Checkbox';


import { makeStyles, withStyles } from "@material-ui/core/styles";

function Factsheet(props) {
  const { useRef } = React;
  const { graphData } = props;

  const [open, setOpen] = useState(false);
  const [openJSON, setOpenJSON] = useState(false);
  const [openOverView, setOpenOverView] = useState(false);
  const [openTurtle, setOpenTurtle] = useState(false);
  const [oekg, setOekg] = useState(graphData);
  const [relations, setRelations] = useState([""]);
  const [concepts, setConcepts] = useState([""]);
  const [nodeContextIsVisible, setNodeContextVisibility ] = useState(false);
  const [linkContextIsVisible, setLinkContextVisibility ] = useState(false);
  const [currentLink, setCurrentLink ] = useState(false);
  const [currentNode, setCurrentNode ] = useState(false);
  const [selectedRelation, setSelectedRelation ] = useState("");
  const [selectedConcept, setSelectedConcept ] = useState("");
  const [newLabel, setNewLabel ] = useState("");
  const [updatedLabel, setUpdatedLabel ] = useState("");
  const [factHasLabel, setFactHasLabel ] = useState(true);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cooldownTicks, setCooldownTicks] = useState(1000);
  const [mode, setMode] = useState("wizard");
  const [treeViewData, setTreeViewData] = useState({});
  const [expanded, setExpanded] = useState(["study"]);
  const [loading, setLoading] = useState(false);
  const [enablePlaygroundMode, setEnablePlaygroundMode] = useState(true);
  const [factsheetObject, setFactsheetObject] = useState({});
  const theme = useTheme();

  const label_checkbox = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleNewLabelChange = (event) => {
    setNewLabel(event.target.value);
    setFactHasLabel(false);
  };

  const handleUpdatedLabel = (event) => {
    setUpdatedLabel(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateLabel = () => {
    const newNodes = oekg.nodes.map(obj => {
      if (obj.class === currentNode.class) {
        return {...obj, id: updatedLabel};
      }
      return obj;
    });
    const newLinks = oekg.links.map(obj => {
      if (obj.source.id === currentNode.id) {
        return {...obj, source: updatedLabel};
      }
      if (obj.target.id === currentNode.id) {
        return {...obj, target: updatedLabel};
      }
      return obj;
    });
    let updated_oekg = {};
    updated_oekg["nodes"] = newNodes;
    updated_oekg["links"] = newLinks;
    setOekg(updated_oekg);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveJSON = () => {
    props.onChange(oekg);
    setOpenJSON(true);
  };

  const handleCloseJSON = () => {
    setOpenJSON(false);
  };

  const handleClickOpenTurtle = () => {
    setOpenTurtle(true);
  };

  const handleCloseTurtle = () => {
    setOpenTurtle(false);
  };

  const fgRef = useRef();

  const containerRef = useRef(null);
  const mouse = useMouse(containerRef, {
    enterDelay: 10,
    leaveDelay: 10,
  });

  const handleRelationChange = (event) => {
    let current_node_info = OEKG_Schema.find( el => el.class === currentNode.class);
    let possible_target_classes = current_node_info.relations.find(el => el.relation_type === event.target.value)["target_classes"];
    setSelectedRelation(event.target.value);
    setConcepts(possible_target_classes);
  };

  const handleConceptChange = (event) => {
    setSelectedConcept(event.target.value);
  };

  const handleClick = node => {
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.centerAt(
    node.x,
    node.y,
    200
    );
    fgRef.current.zoom(20, 500);
    setNodeContextVisibility(false);
    setLinkContextVisibility(false);
  };

  const handleRightClick = node => {
    let current_node_info = OEKG_Schema.find( el => el.class === node.class);
    let current_node_relations = current_node_info["relations"].map(el => el.relation_type);
    setRelations(current_node_relations);
    setCurrentNode(node);

    setX(mouse.clientX);
    setY(mouse.clientY);
    setNodeContextVisibility(true);
    setLinkContextVisibility(false);
  };


  const handleLinkRightClick = link => {
    setX(mouse.clientX);
    setY(mouse.clientY);
    setLinkContextVisibility(true);
    setNodeContextVisibility(false);
    setCurrentLink(link);
  };

  const handleBackgroundClick = node => {
    setNodeContextVisibility(false);
    setLinkContextVisibility(false);
  };

  const style = {
      top: y,
      left: x,
  };

  const searchHandler = (event) => {
      const foundNode = oekg.nodes.find(entry => entry.name === event);

      const distance = 20;
      const distRatio = 1 + distance/Math.hypot(foundNode.x, foundNode.y, foundNode.z);

      fgRef.current.centerAt(
      foundNode.x,
      foundNode.y,
      200
      );
      fgRef.current.zoom(10, 200);

      setNodeContextVisibility(false);
      setLinkContextVisibility(false);

  };

  const resetView = () => {
    fgRef.current.centerAt(
    10,
    10,
    200
    );
    fgRef.current.zoom(5, 200);
  };

  const showOverview = () => {
    setOpenOverView(true);
  };

  const handleCloseOverView = () => {
    setOpenOverView(false);
  };

  const handleSwap = (mode) => {
    setMode(mode);
    if (mode === "wizard") {
        prepareData();
        if (currentNode === false) {
          const rootNode = oekg.nodes.find(node => node.class === "OEO:00020011");
          setCurrentNode(rootNode);
          let current_node_info = OEKG_Schema.find( el => el.class === "OEO:00020011");
          let current_node_relations = current_node_info["relations"].map(el => el.relation_type);
          setRelations(current_node_relations);
        }
    }
    else if (mode === "overview") {
        setOpenOverView(true);
    } else {
      setCooldownTicks(1000);
    }
  };

  function compareNames( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  const prepareData = () => {
    const allLinks = oekg.links;
    const allNodes = oekg.nodes;
    const rootNode = allNodes.find(node => node.class === "OEO:00020011");
    let treeData = [];
    allLinks.forEach(link => {
      if(typeof link.source == "string") {
        const sourceName = allNodes.find(node => node.id === link.source);
        const targetName = allNodes.find(node => node.id === link.target);
        if (sourceName !== undefined && targetName !== undefined)
           treeData.push({'id': link.target, 'parent': link.source, 'name': targetName['name']});
      }
      if(typeof link.source == "object") {
        const sourceName = allNodes.find(node => node.id === link.source.id);
        const targetName = allNodes.find(node => node.id === link.target.id);
        if (sourceName !== undefined && targetName !== undefined)
           treeData.push({'id': link.target.id, 'parent': link.source.id, 'name': targetName['name']});
      }
      }
    );

    function findFor(parentId) {
      var z = [];
      for (var i = 0; i < treeData.length; i++){
        if (treeData[i].parent === parentId) {
          var ch = findFor(treeData[i].id);
          var o = Object.keys(ch).length === 0 ? {} : { children: ch };
          z.push(Object.assign(o, treeData[i]));
        }
      }
      return z.sort( compareNames );
    }

    const rootChildren = findFor(rootNode.id);

    const treeViewData = {
      'id': rootNode.id,
      'parent': '',
      'name': 'study',
      'children': rootChildren
    }
    setTreeViewData(treeViewData);
    setLoading(true);
    }

    const useTreeItemStyles = makeStyles({
      label: {
        fontWeight: "bold"
      }
    });
    const useStyles = makeStyles({
      label: {
        color: "#1a5590",
        fontWeight: "bold !important",
        fontSize: "18px !important"
      }
    });
    const classes = useStyles();
    const renderTree = (nodes: RenderTree) => (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} classes={{ label: classes.label }} >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );

    const handleTreeViewSelect = (event, nodeId) => {
      let current_node = oekg.nodes.find(el => el.id === nodeId);
      setCurrentNode(current_node);

      let current_node_info = OEKG_Schema.find( el => el.class == current_node.class);
      let current_node_relations = current_node_info !== undefined ? current_node_info["relations"].map(el => el.relation_type) : [];
      setRelations(current_node_relations);
    };


    const handleWizardAddFact = () => {
      let current_node_info = OEKG_Schema.find( el => el.class == currentNode.class);
      let target_classes = current_node_info.relations.find(entry => entry.relation_type === selectedRelation)["target_classes"];
      const element = target_classes.find(entry => entry.label === selectedConcept.label);
      const rel = current_node_info.relations.find(entry => entry.relation_type === selectedRelation);
      const newNode = {"class": selectedConcept.class, "name": element.label, "id":  newLabel, "definition": element.definition};
      const newLink = {"source": currentNode.id, "target": newLabel, "name": rel.relation_label, "class": rel.relation_type};
      let updated_oekg = oekg;
      updated_oekg["nodes"].push(newNode);
      updated_oekg["links"].push(newLink);
      setOekg({ ...updated_oekg });
      setSelectedRelation("");
      prepareData();
      setCooldownTicks(1000);
    }

    useEffect(() => {
        prepareData();
    },  [loading]);

    const factsheetObjectHandler = (key, obj) => {
      let newFactsheetObject = factsheetObject;
      newFactsheetObject[key] = obj
      setFactsheetObject(newFactsheetObject);
    }


    const renderFactsheet = (factsheetContent) => {
      if (Object.keys(factsheetContent).length !== 0) {
        return Object.keys(factsheetContent).map((item) => (
          <div style={{ marginTop: '30px', marginLeft: '50px', marginBottom: '10px' }}>
             <b> {item.charAt(0).toUpperCase() + item.slice(1)} </b>
             {
               factsheetContent[item].map((v) => (

                   <div style={{ marginLeft: '25px' }}>
                    <span> {v.title} </span>
                   </div>
             ))
           }
          </div>
        ))
      }
    }



    const [selectedSectors, setSelectedSectors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedFundingSource, setSelectedFundingSource] = useState([]);

    const sectors = [
      { title: 'Agriculture, forestry and land use sector', class: 123 },
      { title: 'Energy demand sector', class: 123 },
      { title: 'Energy transformation sector', class: 123 },
      { title: 'Industry sector', class: 123 },
      { title: 'Waste and wastewater sector', class: 123 },
    ];

    const authors = [
      { title: 'Lüdwig', class: 123 },
      { title: 'Chris', class: 123 },
      { title: 'Hana', class: 123 },
      { title: 'Mirjam', class: 123 },
      { title: 'Lukas', class: 123 },
      { title: 'Alex', class: 123 },
      { title: 'Markus', class: 123 },
      { title: 'Martin', class: 123 },
      { title: 'Adel', class: 123 },
      { title: 'Jonas', class: 123 },
    ];

    const funding_source = [
      { title: 'PTJ', class: 123 },
      { title: 'RLI', class: 123 },
    ];

    const sectorsHandler = (sectorsList) => {
      setSelectedSectors(sectorsList);
      factsheetObjectHandler('sectors', sectorsList);
    };

    const authorsHandler = (authorsList) => {
      setSelectedAuthors(authorsList);
      factsheetObjectHandler('authors', authorsList);
    };

    const fundingSourceHandler = (authorsList) => {
      setSelectedFundingSource(authorsList);
      factsheetObjectHandler('funding_source', authorsList);
    };


    const items = {
      titles: ['Funding source', 'Authors', 'Sectors', 'Regions', 'Energy carriers', 'Scenarios', 'Models', 'Frameworks', 'Inputs', 'Outputs', 'Publications' ],
      contents: [
        <CustomAutocomplete optionsSet={funding_source} kind='funding source' handler={fundingSourceHandler} selectedElements={selectedFundingSource}/>,
        <CustomAutocomplete optionsSet={authors} kind='author' handler={authorsHandler} selectedElements={selectedAuthors}/>,
        <CustomAutocomplete optionsSet={sectors} kind='sector' handler={sectorsHandler} selectedElements={selectedSectors}/>,
        'Regions', 'Energy carriers', 'Scenarios', 'Models',
        'Frameworks', 'Inputs', 'Outputs',
        'Publications' ]
    }




    return (
      <div >
        <Grid container spacing={2} >
          <Grid item xs={8} >
          <div>
             {enablePlaygroundMode &&
               <CustomSwap handleSwap={handleSwap} />
             }
          </div >
          </Grid>
          <Grid item xs={4} >
            <div>
              <Button disableElevation={true} startIcon={<DraftsIcon />} size="large" style={{ 'textTransform': 'none', 'marginTop': '15px', 'marginLeft': '15%', 'zIndex': '1000', 'height': '55px' }} variant="outlined" color="primary" onClick={handleSaveJSON} >Save as a draft</Button>
              <Button disableElevation={true} startIcon={<AddBoxIcon />} size="large" style={{ 'textTransform': 'none', 'marginTop': '15px', 'marginLeft': '2%', 'zIndex': '1000', 'height': '55px'  }} variant="contained" color="primary" onClick={handleClickOpenTurtle}>Add to OEKG</Button>
            </div >
          </Grid>

          <Grid item xs={12}>
            <Dialog
              fullWidth
              maxWidth="sm"
              open={openTurtle}
              onClose={handleClickOpenTurtle}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                <b>Save as a Turtle file </b>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    <pre>
                      Open Energy Knowledge Graph
                    </pre>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseTurtle} autoFocus>
                  Download
                </Button>
                <Button variant="contained" autoFocus onClick={handleCloseTurtle}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              fullWidth
              maxWidth="lg"
              open={openJSON}
              onClose={handleCloseJSON}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                <b>Save as a JSON file, </b>
                <i> In future, you can open it again with OEKG composer for further changes.</i>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    <pre>{JSON.stringify(oekg, null, '\t')}</pre>
                    <pre>{JSON.stringify({factsheetObject}, null, '\t')}</pre>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseJSON} autoFocus>
                  Download
                </Button>
                <Button variant="contained" autoFocus onClick={handleCloseJSON}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>



            <Dialog
              fullWidth
              maxWidth="lg"
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                <Typography variant="subtitle2" gutterBottom component="div">
                <div><span> <b>Definition:</b> </span> {currentNode.definition} </div>
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  <div><span> <b>Type:</b> </span> {currentNode.name}</div>
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  <div><span> <b>Class:</b> </span> <a href={'https://openenergy-platform.org/ontology/oeo/' + String(currentNode.class).replace(':', '_')} >{currentNode.class}</a></div>
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div style= {{ 'marginTop': '20px' }}>
                    <span>
                      <TextField id="outlined-basic"
                      label="Label"
                      variant="outlined"
                      defaultValue={currentNode.id}
                      style={{ 'width': '400px' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleUpdatedLabel}/>
                    </span>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleUpdateLabel} autoFocus>
                  Save
                </Button>
                <Button variant="contained" autoFocus onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <div className='container' ref={containerRef}>
              <Typography variant="subtitle2" gutterBottom component="div">

                {nodeContextIsVisible && <div className='context-menu' style={style}>
                    <div className='context-menu__item'>
                      Add new fact about { currentNode.id.length > 25 ? currentNode.id.substring(0, 25) + "..." : currentNode.id }
                    </div>

                    <div className='context-menu__item'>
                        <span> Relation: </span>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectedRelation}
                          onChange={handleRelationChange}
                          label="Age"
                          style= {{ 'width': '220px', 'height': '30px' }}
                        >
                          {relations.map((el, idx)  =>
                            {
                                let current_node_info = OEKG_Schema.find(el => el.class === currentNode.class);
                                const element = current_node_info.relations.find(entry => entry.relation_type === el)["relation_label"];
                                return (<MenuItem key={idx} value={el} > {element !== undefined ? element : el} </MenuItem>)
                            }
                          )}
                        </Select>
                    </div>

                    <div className='context-menu__item'>
                        <span> Concept: </span>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectedConcept}
                          onChange={handleConceptChange}
                          label="Age"
                          style= {{ 'width': '220px', 'height': '30px' }}
                        >
                          {concepts.map((el, idx)  =>
                            {
                              let current_node_info = OEKG_Schema.find( el => el.class === currentNode.class);
                              let element = "";
                              if(selectedRelation !== "") {
                                let target_classes = current_node_info.relations.find(entry => entry.relation_type === selectedRelation)["target_classes"];
                                element = target_classes.find(entry => entry.label === el.label);
                              }
                              return (<MenuItem key={idx} value={el} > {element !== undefined ? element.label : ""} </MenuItem>)
                            }
                          )}
                        </Select>
                    </div>
                    <div className='context-menu__item'>
                      <TextField size="small" variant="standard" id="outlined-basic" label="Label" style= {{ 'width': '285px' }} onChange={handleNewLabelChange}/>
                    </div>
                    <div className='context-menu__item'>
                      <Fab  color="primary"
                            style={{ 'textTransform': 'none',  'marginRight': '5px', 'marginTop': '5px', 'float': 'right' }}
                            size="small"
                            disabled={factHasLabel}
                            onClick={() => {
                            let current_node_info = OEKG_Schema.find( el => el.class === currentNode.class);
                            let target_classes = current_node_info.relations.find(entry => entry.relation_type === selectedRelation)["target_classes"];
                            const element = target_classes.find(entry => entry.label === selectedConcept.label);

                            const rel = current_node_info.relations.find(entry => entry.relation_type === selectedRelation);

                            const newNode = {"class": selectedConcept.class, "name": element.label, "id":  newLabel, "definition": element.definition};
                            const newLink = {"source": currentNode.id, "target": newLabel, "name": rel.relation_label, "class": rel.relation_type};

                            let updated_oekg = oekg;
                            updated_oekg["nodes"].push(newNode);
                            updated_oekg["links"].push(newLink);
                            setOekg({ ...updated_oekg });
                            setNodeContextVisibility(false);
                            setLinkContextVisibility(false);
                            setCooldownTicks(100);
                            setSelectedRelation("");

                        }}>
                        <AddIcon />
                      </Fab>
                    </div>
                    <div className='context-menu__item'>
                      See details
                      <Fab  color="primary"
                            style={{ 'textTransform': 'none', 'marginRight': '5px', 'float': 'right' }}
                            size="small" onClick={() => {
                              handleClickOpen()
                          }}>
                          <FeedIcon/>
                      </Fab>
                    </div>
                    <div className='context-menu__item'>
                        Remove this entity
                      <Fab  color="error"
                            style={{ 'textTransform': 'none', 'marginRight': '5px', 'float': 'right' }}
                            size="small" onClick={() => {
                            let updated_oekg = oekg;
                            updated_oekg["nodes"] = updated_oekg["nodes"].filter(item => item !== currentNode);
                            setOekg({ ...updated_oekg });
                            setNodeContextVisibility(false);
                            setLinkContextVisibility(false);
                          }}>
                          <DeleteIcon/>
                      </Fab>
                    </div>

                </div>}

              </Typography>

              {linkContextIsVisible && <div className='context-menu_link' style={style}>
                <div className='context-menu__item_link' onClick={() => {
                    let updated_oekg = oekg;
                    updated_oekg["links"] = updated_oekg["links"].filter(item => item !== currentLink);
                    const remainingNodes = updated_oekg["nodes"].filter(item => item.id !== currentLink.target.id);
                    updated_oekg["nodes"] = remainingNodes.length === 1 ? remainingNodes : updated_oekg["links"];
                    setOekg({ ...updated_oekg });
                    setNodeContextVisibility(false);
                    setLinkContextVisibility(false);
                  }}>
                  Remove
                </div>
                <div className='context-menu__item_link'>
                  More info...
                </div>
                <div className='context-menu__item_link'>
                  Highlight
                </div>
              </div>}

              {mode === "playground" &&
              <div>
                <div style= {{ textAlign: 'center' }}>
                  <CustomSearchInput searchHandler={searchHandler} data={oekg.nodes} />
                </div>
              <ForceGraph2D
                width= {window.innerWidth  }
                height= {window.innerHeight / 1.2}
                backgroundColor={"rgba(255, 255, 255"}
                graphData={oekg}
                nodeOpacity={1}
                showNavInfo={false}
                nodeResolution={20}
                nodeRelSize={5}
                nodeLabel={(node) =>
                    `<span style="font-size: 24px">${node.definition}</span>`
                  }
                nodeVal={(node) => node.group}
                nodeCanvasObject={(node, ctx, globalScale) => {
                        //const fontSize = node.size / 3.5;
                        const fontSize = 4;
                        ctx.font = `Bold ${fontSize}px Tahoma`;
                        // ctx.fillStyle = node.color[0];
                        ctx.fillStyle = "#DDDDDD";
                        ctx.beginPath();
                        //ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
                        ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.fill();
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.strokeStyle = "#3C7FA8";
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        ctx.fill();
                        const label = node.name;
                        const node_id = node.id.length > 12 ? node.id.substring(0, 12) + "..." : node.id;
                        var lines = label.split(" ");
                        // ctx.fillStyle = "#FFFFFF";
                        ctx.fillStyle = "#001f3f";
                        if (lines.length === 1) {
                          ctx.fillText(lines[0], node.x, node.y );
                          ctx.font = `Italic ${fontSize - 1}px Tahoma`;
                          ctx.fillStyle = "#3C7FA8";
                          ctx.fillText(node_id, node.x, node.y + 6 );
                        } else {
                          for (var i = 0; i <lines.length; i++) {
                            if (i === 0) {
                              ctx.fillText(lines[i], node.x, node.y - 6 );
                            } else if (i === 1) {
                              ctx.fillText(lines[i], node.x, node.y - 2);
                            } else {
                              ctx.fillText(lines[i], node.x, node.y + 2 );
                            }
                          }
                        }
                        ctx.font = `Italic ${fontSize - 1}px Tahoma`;
                        ctx.fillStyle = "#3C7FA8";
                        ctx.fillText(node_id, node.x, node.y + 6 );

                        // ctx.fillStyle = "#39CCCC";
                        ctx.fillStyle = "#DDDDDD";
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
                    linkDirectionalArrowLength={6}
                    linkDirectionalArrowRelPos={0.5}
                    //linkWidth={(link) => link.value}
                    linkWidth={4}
                    linkResolution={20}
                    linkColor={() => "#3C7FA8"}
                    ref={fgRef}
                    onNodeClick={node => handleClick(node)}
                    onNodeRightClick={node => handleRightClick(node)}
                    onBackgroundClick={node => handleBackgroundClick(node)}
                    d3VelocityDecay={0.01}
                    cooldownTime={1000}
                    onNodeDragEnd={node => {
                      node.fx = node.x;
                      node.fy = node.y;
                      node.fz = node.z;
                    }}

                    linkLabel={(link) => {
                      const sourceNode = link.source.id;
                      const targetNode = link.target.id;

                      let foundLinks = oekg["links"].filter(
                        item => item.source.id === sourceNode
                        &&
                        item.target.id === targetNode
                      );
                      return `<span style="font-size: 24px">${foundLinks.map(el => (" " + el.name + " "))}</span>`;
                      }
                    }
                    onLinkRightClick={link => handleLinkRightClick(link)}
                    linkHoverPrecision={70}
                    cooldownTicks={cooldownTicks}
                />
                </div>

              }

                {mode === "wizard" &&
                  <div className='wizard'>
                      <Grid container spacing={2} >
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                          <CustomTabs
                            factsheetObjectHandler={factsheetObjectHandler}
                            items={items}
                              />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                      </Grid>
                  </div>
                }

                {mode === "overview" &&
                  <div className='wizard'>
                      <Grid container spacing={2} >
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                          <div>
                            {renderFactsheet(factsheetObject)}
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                      </Grid>
                  </div>
                }
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Factsheet;
