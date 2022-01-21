import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import diaries, { Diary } from '../diaryData';

const diarySort = (a: Diary, b: Diary) => {
  if (+a.postDate < +b.postDate) return -1;
  if (+a.postDate > +b.postDate) return 1;
  return 0;
};

const diariesInitialState: Diary[] = diaries;
const diariesSlice = createSlice({
  name: 'diaries',
  initialState: diariesInitialState,
  reducers: {
    create: (state, { payload }: PayloadAction<Diary>) => {
      state.push(payload);
      state.sort(diarySort);
    },
    edit: (state, { payload }: PayloadAction<Diary>) => {
      const index = state.findIndex(
        (diary: Diary) => diary.diaryId === payload.diaryId
      );
      if (index !== -1) {
        state.splice(index, 1, payload).sort(diarySort);
      }
    },
    remove: (state, { payload }: PayloadAction<{ diaryId: string }>) => {
      const index = state.findIndex(
        (diary: Diary) => diary.diaryId === payload.diaryId
      );
      console.log(`delete:${index}`);
      if (index !== -1) {
        state.splice(index, 1).sort(diarySort);
      }
    },
  },
});

export const {
  create: createDiaryActionCreator,
  edit: editDiaryActionCreator,
  remove: deleteDiaryActionCreator,
} = diariesSlice.actions;

const reducers = {
  diaries: diariesSlice.reducer,
};

export default configureStore({
  reducer: reducers,
  middleware: [logger],
});

export type State = {
  diaries: Diary[];
  targetDiaryId: string;
};
