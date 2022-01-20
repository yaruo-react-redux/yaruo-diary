import React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import { Diary } from '../diaryData';
import DiaryCard from './DiaryCard';

export type DiaryBoardProps = {
  diaries: Diary[];
};

const Copyright = () => (
  <Typography variant='body2' color='text.secondary' align='center'>
    {'Copyright © '}
    <Link color='inherit' href='https://mui.com/'>
      やる夫が読書します。
    </Link>
    {` ${new Date().getFullYear()}.`}
  </Typography>
);

const DiaryBoard = (props: DiaryBoardProps) => {
  const { diaries } = props;

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            やる夫の読書日記
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={4}>
            {diaries.map((diary) => (
              <Grid item key={diary.diaryId} xs={12} sm={6} md={4}>
                <DiaryCard diary={diary} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          やる夫の読書日記
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          お前らも本読んだ良いお〜！
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
};

export default DiaryBoard;
