import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';

import {
  createDiaryActionCreator,
  editDiaryActionCreator,
  State,
} from '../redux/redux-og';

import { Diary } from '../diaryData';
import DiaryCard from './DiaryCard';
import DiaryFormDialog from './DiaryFormDialog';

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

const DiaryBoard = () => {
  // ActionCreatorから返ってきたActionをReducerへ送る
  const dispatch = useDispatch();
  // 読書日記データ
  const diaryData = useSelector((state: State) => state.diaries);
  // DiaryFormDialogの開閉状態
  const [openDialog, setOpenDialog] = useState(false);
  // 編集対象の読書日記データ
  const [targetDiaryData, setTargetDiaryData] = useState(initialDiary);

  // Formにデータを渡して表示する
  const setDataToForm = (diaryId: string) => {
    if (diaryId.length === 0) {
      setTargetDiaryData(initialDiary);
      setOpenDialog(true);
    } else {
      const editDiary = diaryData.filter((d) => d.diaryId === diaryId);
      if (editDiary.length === 1) {
        setTargetDiaryData(editDiary[0]);
        setOpenDialog(true);
      }
    }
  };

  // 編集対象データでDiaryFormDialogを開く
  const openForm = () => {
    setDataToForm('');
  };

  // 編集・削除ボタンクリック
  const onClickCardHeaderAction = (diaryId: string): void => {
    setDataToForm(diaryId);
  };

  // 編集フォームから呼ばれる
  const closeForm = (diary: Diary | null) => {
    // Dialogを閉じる
    setOpenDialog(false);
    if (diary !== null) {
      // 保存
      let newDiary: Diary;
      if (diary.diaryId === '') {
        const newDiaryId: string = uuidv4();
        newDiary = { ...diary, diaryId: newDiaryId };
        dispatch(createDiaryActionCreator(newDiary));
      } else {
        newDiary = { ...diary };
        dispatch(editDiaryActionCreator(newDiary));
      }
    }
  };

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
            {diaryData.map((diary) => (
              <Grid item key={diary.diaryId} xs={12} sm={6} md={4}>
                <DiaryCard
                  diary={diary}
                  onClickCardHeaderAction={onClickCardHeaderAction}
                />
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
      <DiaryFormDialog
        open={openDialog}
        diary={targetDiaryData}
        closeForm={closeForm}
      />
    </>
  );
};

export default DiaryBoard;
