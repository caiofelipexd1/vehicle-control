import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CommuteIcon from '@mui/icons-material/Commute';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../../images/logo.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ title, children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(path) {
    navigate(`${path}`);
  }

  const menuOptions = [
    {
      key: 'movements',
      icon: <TransferWithinAStationIcon />,
      name: 'Movimentações',
      path: '/movements'
    },
    {
      key: 'vehicles',
      icon: <DriveEtaIcon />,
      name: 'Veículos',
      path: '/vehicles'
    },
    {
      key: 'vehicles_type',
      icon: <CommuteIcon />,
      name: 'Tipos de Veículo',
      path: '/vehicles/types'
    },
    {
      key: 'conductors',
      icon: <PeopleAltIcon />,
      name: 'Condutor/Motorista',
      path: '/conductors'
    },
    {
      key: 'locations',
      icon: <PinDropIcon />,
      name: 'Locais',
      path: '/locations'
    },
    {
      key: 'accounts',
      icon: <AccountCircleIcon />,
      name: 'Contas',
      path: '/accounts'
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="span">
            {title}
          </Typography>
          <IconButton style={{ borderRadius: 0 }}color='inherit' aria-label="logout" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src={Logo} alt='logo' width={150} style={{ marginRight: '5px' }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            menuOptions.map((option) => {
              return (
                <ListItem button selected={option.path === location.pathname} key={option.key} onClick={() => handleClick(option.path)}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.name} />
                </ListItem>
              );
            })
          }
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2, pt: 1.5, pb: 0, backgroundColor: '#f8f8f2', minHeight: '100vh' }}>
        <DrawerHeader />
        { children }
      </Box>
    </Box>
  );
}
