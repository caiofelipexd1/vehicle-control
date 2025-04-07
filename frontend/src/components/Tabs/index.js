import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function LabTabs({ children, tabValue, onChangeTab }) {

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={onChangeTab} aria-label="lab API tabs example">
            <Tab label="Movimentações" value="1" />
            <Tab label="Registrar Movimentação" value="2" />
          </TabList>
        </Box>
        {children}
      </TabContext>
    </Box>
  );
}
