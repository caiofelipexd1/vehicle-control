import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: '#363636',
			dark: '#202020',
			contrastText: '#fff'
		},
		info: {
			main: '#1976d2',
			contrastText: '#fff'
		},
		success: {
			main: '#4CAF50',
			contrastText: '#fff'
		},
		error: {
			main: '#F44336',
			contrastText: '#fff'
		},
		warning: {
      main: '#E3D026',
      contrastText: '#fff',
    },
	},
	components: {
		MUIDataTable: {
			styleOverrides:{
				root: {
					border: '1px solid #dee2e6 !important',
					borderRadius: '0 !important',
        },
        paper: {
          boxShadow: "none !important",
        }
			},
    },
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: '10px !important',
					textAlign: 'center !important'
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: '0px !important',
				}
			}
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: '25px 0px 0px 0px !important',
				}
			}
		}
	}
});

export default theme;