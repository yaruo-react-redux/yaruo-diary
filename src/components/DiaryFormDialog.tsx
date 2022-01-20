import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { Diary } from '../diaryData';
import DiaryForm from './DiaryForm';

export type DialogDiaryFormProps = {
  open: boolean;
  diary: Diary;
  closeForm: (diaryData: Diary | null) => void;
};

const DialogDiaryForm = (props: DialogDiaryFormProps) => {
  const { open, diary, closeForm } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>日記編集</DialogTitle>
      <DiaryForm diary={diary} closeForm={closeForm} />
    </Dialog>
  );
};

export default DialogDiaryForm;
