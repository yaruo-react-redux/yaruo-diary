declare module '*.png';

// 読書日記のデータ型
export type Diary = {
  diaryId: string;
  title: string;
  postDate: string;
  imageUrl: string;
  imageLabel: string;
  mainContent: string;
  readmore: string[];
};
