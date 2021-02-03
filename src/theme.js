import { createMuiTheme } from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#84ffac',
        },
        '&$active': {
          color: '#84ffac',
        },
      },
      active: {},
      completed: {},
    },
    MuiDrawer: {
      paper: {
        backgroundColor: grey[900],
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: grey[900],
      },
    },
  },
});

export default theme;
