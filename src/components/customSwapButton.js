import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SchemaIcon from '@mui/icons-material/Schema';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

export default function ColorToggleButton(props) {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.handleSwap(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      size="large"
      style={{ 'marginTop': '15px' }}>
    >
      <ToggleButton value="wizard" style={{ 'textTransform': 'none' }}> <ListAltIcon /> Factsheet</ToggleButton>
      <ToggleButton value="overview" style={{ 'textTransform': 'none' }}> <FactCheckOutlinedIcon /> Overview</ToggleButton>
      <ToggleButton value="playground" style={{ 'textTransform': 'none' }}> <SchemaIcon /> Visualize</ToggleButton>
    </ToggleButtonGroup>
  );
}
