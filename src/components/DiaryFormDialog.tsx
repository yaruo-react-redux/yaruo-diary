import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { Diary } from '../diaryData';
import DiaryForm from './DiaryForm';

export interface DialogDiaryFormProps {
  open: boolean;
  diary: Diary;
}

const DialogDiaryForm = (props: DialogDiaryFormProps) => {
  const { open, diary } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>日記編集</DialogTitle>
      <DiaryForm diary={diary} />
    </Dialog>
  );
};

export default DialogDiaryForm;
