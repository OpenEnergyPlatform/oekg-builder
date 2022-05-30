import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

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
      size="small"
      style={{ 'marginTop': '15px' }}>
    >
      <ToggleButton value="playground" style={{ 'textTransform': 'none' }}> <BubbleChartIcon /> Playground</ToggleButton>
      <ToggleButton value="wizard" style={{ 'textTransform': 'none' }}> <AutoFixHighIcon /> Wizard</ToggleButton>
    </ToggleButtonGroup>
  );
}
