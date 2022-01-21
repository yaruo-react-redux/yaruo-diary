import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';

import diaries, { Diary } from '../diaryData';

// Action定数
const CREATE_DIARY = 'CREATE_DIARY';
const EDIT_DIARY = 'EDIT_DIARY';
const DELETE_DIARY = 'DELETE_DIARY';

// Actions & Action Type
type CreateDiaryActionType = {
  type: typeof CREATE_DIARY;
  payload: Diary;
};

export const createDiaryActionCreator = (
  data: Diary
): CreateDiaryActionType => ({
  type: CREATE_DIARY,
  payload: data,
});

type EditDiaryActionType = {
  type: typeof EDIT_DIARY;
  payload: Diary;
};

export const editDiaryActionCreator = (data: Diary): EditDiaryActionType => ({
  type: EDIT_DIARY,
  payload: data,
});

type DeleteDiaryActionType = {
  type: typeof DELETE_DIARY;
  payload: { diaryId: string };
};

export const deleteDiaryActionCreator = ({
  diaryId,
}: {
  diaryId: string;
}): DeleteDiaryActionType => ({
  type: DELETE_DIARY,
  payload: { diaryId },
});

// Reducers
type DiaryActionTypes =
  | CreateDiaryActionType
  | EditDiaryActionType
  | DeleteDiaryActionType;

const diariesInitialState = diaries;

const diarySort = (a: Diary, b: Diary) => {
  if (+a.postDate < +b.postDate) return -1;
  if (+a.postDate > +b.postDate) return 1;
  return 0;
};

const diariesReducer = (
  // eslint-disable-next-line default-param-last
  state: Diary[] = diariesInitialState,
  action: DiaryActionTypes
) => {
  switch (action.type) {
    case CREATE_DIARY: {
      const { payload } = action;
      return [...state, payload].sort(diarySort);
    }
    case EDIT_DIARY: {
      const { payload } = action;
      return state
        .map((diary) => (diary.diaryId === payload.diaryId ? payload : diary))
        .sort(diarySort);
    }
    case DELETE_DIARY: {
      const { payload } = action;
      return state
        .filter((diary) => diary.diaryId !== payload.diaryId)
        .sort(diarySort);
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  diaries: diariesReducer,
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger))
);

export type State = {
  diaries: Diary[];
};
