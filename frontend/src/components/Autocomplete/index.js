import React from 'react';
import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';

export default function Autocomplete({ label, name, data, defaultValue, onChange, getOptionLabel }) {
  return (
    <MUIAutocomplete
      name={name}
      sx={{ marginTop: '5px' }}
      onChange={onChange}
      options={data}
      defaultValue={defaultValue}
      getOptionLabel={getOptionLabel ? getOptionLabel : (option) => `${option.name}`}
      isOptionEqualToValue={(option, value) =>
        option.id === value.id
      }
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
}