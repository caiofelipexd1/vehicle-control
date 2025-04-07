import * as React from 'react';
import { Chip as MUIChip } from '@mui/material';

export default function Chip({ label, color }) {
  return (
    <MUIChip sx={{ borderRadius: 3, height: 'auto', padding: '2.5px' }} label={label} color={color} />
  );
}