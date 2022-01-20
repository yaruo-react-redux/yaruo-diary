import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import Stack from '@mui/material/Stack';

import { convertStringToDate } from '../utilities/helper';
import { Diary } from '../diaryData';

interface DiaryFormProps {
  diary: Diary;
}

const DiaryForm = (props: DiaryFormProps) => {
  const { diary } = props;
  const {
    diaryId,
    title,
    postDate,
    imageUrl,
    imageLabel,
    mainContent,
    readmore,
  } = diary;

  // hooksでフォームデータ保持
  // タイトル
  const [onEditTitle, setOnEditTitle] = useState(title);
  const [diaryTitleErr, setDiaryTitleErr] = useState(false);
  const [diaryTitleErrMsg, setDiaryTitleErrMsg] = useState('');
  // 投稿日
  const [onEditPostDate, setOnEditPostDate] = useState<Date | null>(
    convertStringToDate(postDate)
  );
  // 画像URL
  const [onEditImageUrl, setOnEditImageUrl] = useState(imageUrl);
  // 画像ALT
  const [onEditImageLabel, setOnEditImageLabel] = useState(imageLabel);
  // 本文
  const [onEditMainContent, setOnEditMainContent] = useState(mainContent);
  const [mainContentErr, setMainContentErr] = useState(false);
  const [mainContentErrMsg, setMainContentErrMsg] = useState('');
  // 追記
  const [onEditReadMore, setOnEditReadMore] = useState(readmore.join('\n\n'));

  const titleRef = useRef<HTMLInputElement>(null);
  const mainContentRef = useRef<HTMLInputElement>(null);

  // 入力データ検証
  const validateFieldData = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'diaryTitle':
        setOnEditTitle(event.target.value);
        if (event.target.value.length < 5) {
          setDiaryTitleErr(true);
          setDiaryTitleErrMsg('4文字以上入力してください。');
        } else {
          setDiaryTitleErr(false);
          setDiaryTitleErrMsg('');
        }
        break;
      case 'diaryMainContent':
        setOnEditMainContent(event.target.value);
        if (event.target.value.length < 5) {
          setMainContentErr(true);
          setMainContentErrMsg('4文字以上入力してください。');
        } else {
          setMainContentErr(false);
          setMainContentErrMsg('');
        }
        break;
      case 'diaryReadMore':
        setOnEditReadMore(event.target.value);
        break;
      case 'diaryImageUrl':
        setOnEditImageUrl(event.target.value);
        break;
      case 'diaryImageLabel':
        setOnEditImageLabel(event.target.value);
        break;
      default:
        break;
    }
  };

  // 保存ボタン
  const saveData = () => {};

  // キャンセルボタン
  const cancelForm = () => {};

  return (
    <Paper variant='outlined' sx={{ m: 1, py: 2 }}>
      <Grid container spacing={2} sx={{ pl: 5 }}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            required
            id='diary-title'
            label='タイトル'
            error={diaryTitleErr}
            fullWidth
            name='diaryTitle'
            value={onEditTitle}
            helperText={diaryTitleErrMsg}
            onChange={validateFieldData}
            inputRef={titleRef}
          />
        </Grid>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='日付'
              value={onEditPostDate}
              onChange={(newValue: Date | null) => {
                setOnEditPostDate(newValue);
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            required
            multiline
            id='diary-mainContent'
            label='本文'
            error={mainContentErr}
            fullWidth
            name='diaryMainContent'
            value={onEditMainContent}
            helperText={mainContentErrMsg}
            onChange={validateFieldData}
            inputRef={mainContentRef}
          />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            multiline
            minRows='4'
            maxRows='6'
            id='diary-readmore'
            label='追記'
            fullWidth
            name='diaryReadMore'
            value={onEditReadMore}
            onChange={validateFieldData}
            helperText='空行を入れると段落表示されます。'
          />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            id='diary-imageUrl'
            label='画像URL'
            fullWidth
            name='diaryImageUrl'
            onChange={validateFieldData}
            value={onEditImageUrl}
            helperText='画像のURL'
          />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            id='diary-imageLabel'
            label='画像の代替テキスト'
            fullWidth
            name='diaryImageLabel'
            onChange={validateFieldData}
            value={onEditImageLabel}
            helperText='画像が表示されない場合のテキスト'
          />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              startIcon={<CancelIcon />}
              onClick={cancelForm}
            >
              キャンセル
            </Button>
            <Button
              variant='contained'
              endIcon={<DataSaverOnIcon />}
              onClick={saveData}
            >
              保存
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DiaryForm;
