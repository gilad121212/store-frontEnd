import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

type SortLineProps = {
  handle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
};

export default function SortLine({ handle, value }: SortLineProps) {
  return (
    <Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '5px', marginTop: '16px' }}>
      <RadioGroup value={value} onChange={handle}>
        <FormControlLabel value="200" control={<Radio />} label="0 - 200" />
        <FormControlLabel value="400" control={<Radio />} label="200 - 400" />
        <FormControlLabel value="800" control={<Radio />} label="400 - 800" />
        <FormControlLabel value="1200" control={<Radio />} label="800 - 1200" />
      </RadioGroup>
    </Box>
  );
}
