import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import diaries from '../diaryData';
import DiaryBoard from './DiaryBoard';

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DiaryBoard diaries={diaries} />
  </ThemeProvider>
);

export default App;
