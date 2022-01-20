import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Diary } from '../diaryData';
import DiaryCard from './DiaryCard';
import DiaryFormDialog from './DiaryFormDialog';

export type DiaryBoardProps = {
  diaries: Diary[];
};

// diary初期化データ
const initialDiary: Diary = {
  diaryId: '',
  title: '',
  postDate: '',
  imageUrl: '',
  imageLabel: '',
  mainContent: '',
  readmore: [],
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

  // DiaryFormDialogの開閉状態
  const [openDialog, setOpenDialog] = useState(false);

  // 新規データでDiaryFormDialogを開く
  const openForm = () => setOpenDialog(true);

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6' color='inherit' noWrap>
              やる夫の読書日記
            </Typography>
          </Box>
          <Box>
            <IconButton
              size='large'
              edge='end'
              aria-label='新規読書日記'
              onClick={openForm}
              color='inherit'
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
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
      <DiaryFormDialog open={openDialog} diary={initialDiary} />
    </>
  );
};

export default DiaryBoard;
