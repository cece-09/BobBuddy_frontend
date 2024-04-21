'use client';
import { Theme, createTheme } from '@mui/material';

export type PaletteKey =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

/* Custom Theme 정의 */
export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#5E1EE7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#E6EDF3',
    },
  },
});
