import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Diary } from '../diaryData';
// import DiaryBoard from './DiaryBoard';
import DiaryCard from './DiaryCard';

const initialData: Diary = {
  diaryId: '9784781611495',
  title: '「タモリ学　戸部田誠」を読んだお',
  postDate: '20210601',
  imageUrl: 'http://inazuma.xsrv.jp/book_images/9784781611495_100.jpg',
  imageLabel: '',
  mainContent:
    'デビュー時から現在までの、タモリの様々な発言やエピソードを丹念に読み解き、・・・',
  readmore: [
    'タモリにとって「アドリブとは何か？」',
    'タモリをもっと知りたくて。デビュー時から現在までの、タモリの様々な発言やエピソードを丹念に読み解き、・・・',
    '著者について',
    '78年生まれ、いわき市在住のテレビっ子。お笑い、格闘技、ドラマ好き。・・・',
  ],
};

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DiaryCard diary={initialData} />
  </ThemeProvider>
);

export default App;
