// DateオブジェクトからYYYYMMDDの文字列へ変換
export const convertDateToString = (date: Date): string => {
  const monthString = `0${date.getMonth() + 1}`.slice(-2);
  const dayString = `0${date.getDate()}`.slice(-2);

  return `${date.getFullYear()}${monthString}${dayString}`;
};

// YYYYMMDD文字列からDateオブジェクトへ変換
export const convertStringToDate = (dateString: string): Date => {
  let date;
  if (dateString.length !== 8) {
    date = new Date();
  } else {
    date = new Date(
      +dateString.slice(0, 4),
      +dateString.slice(4, 6) - 1,
      +dateString.slice(6)
    );
  }
  return date;
};

// YYYYMMDDからYYYY年M月Dに変換
export const convertToLongDateString = (dateString: string) => {
  const date = convertStringToDate(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
