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
import { v4 as uuidv4 } from 'uuid';

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

  // diary data
  const [diaryData, setDiaryData] = useState(diaries);
  // DiaryFormDialogの開閉状態
  const [openDialog, setOpenDialog] = useState(false);
  // 編集対象の読書日記データ
  const [targetDiaryData, setTargetDiaryData] = useState(initialDiary);

  // postDateを数値に変換して比較し並べ替え
  const diarySort = (a: Diary, b: Diary) => {
    if (+a.postDate < +b.postDate) return -1;
    if (+a.postDate > +b.postDate) return 1;
    return 0;
  };

  // Formにデータを渡して表示する
  const setDataToForm = (diaryId: string) => {
    if (diaryId === '') {
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
  const openForm = () => setDataToForm('');

  // 日記データの削除
  const deleteDiary = (diaryId: string) => {
    const newDiaryData = diaryData.filter((diary) => diary.diaryId !== diaryId);
    setDiaryData(newDiaryData);
  };

  // 編集・削除ボタンクリック
  const onClickCardHeaderAction = (diaryId: string, mode: string): void => {
    switch (mode) {
      case 'EDIT':
        setDataToForm(diaryId);
        break;
      case 'DELETE':
        deleteDiary(diaryId);
        break;
      default:
        break;
    }
  };

  // データを保存
  const saveDiary = (diary: Diary) => {
    const newDiaryData = diaryData.filter((d) => d.diaryId !== diary.diaryId);
    newDiaryData.push(diary);
    newDiaryData.sort(diarySort);
    setDiaryData(newDiaryData);
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
      } else {
        newDiary = { ...diary };
      }
      saveDiary(newDiary);
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
