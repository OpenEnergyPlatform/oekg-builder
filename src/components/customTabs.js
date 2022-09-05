import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CustomAutocomplete from './customAutocomplete.js';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function arrayProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs(props) {
  const { factsheetObjectHandler } = props;
  const [value, setValue] = useState(0);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const sectorsHandler = (sectorsList) => {
    setSelectedSectors(sectorsList);
    factsheetObjectHandler('sectors', sectorsList);
  };

  const authorsHandler = (authorsList) => {
    setSelectedAuthors(authorsList);
    factsheetObjectHandler('authors', authorsList);
  };

  const items = {
    titles: ['Funding source', 'Authors', 'Analysis scope', 'Sectors', 'Regions', 'Energy carriers', 'Scenarios', 'Models', 'Frameworks', 'Inputs', 'Outputs', 'Publications' ],
    contents: ['Funding source',
      <CustomAutocomplete optionsSet={authors} kind='author' handler={authorsHandler} selectedElements={selectedAuthors}/>,
      'Analysis scope',
      <CustomAutocomplete optionsSet={sectors} kind='sector' handler={sectorsHandler} selectedElements={selectedSectors}/>,
      'Regions', 'Energy carriers', 'Scenarios', 'Models',
      'Frameworks', 'Inputs', 'Outputs',
      'Publications' ]
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          {items.titles.map((item, index) => {
            return <Tab label={item} {...arrayProps(index)} />;
            })}
        </Tabs>
      </Box>
      {items.contents.map((content, index) => {
        return <TabPanel value={value} index={index}>
          {content}
        </TabPanel>;
        })}
    </Box>
  );
}
