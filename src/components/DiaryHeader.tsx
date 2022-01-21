/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useDispatch } from 'react-redux';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { deleteDiaryActionCreator } from '../redux/redux-og';

import January from '../assets/images/month-icons/january.svg';
import February from '../assets/images/month-icons/february.svg';
import March from '../assets/images/month-icons/march.svg';
import April from '../assets/images/month-icons/april.svg';
import May from '../assets/images/month-icons/may.svg';
import Jun from '../assets/images/month-icons/june.svg';
import July from '../assets/images/month-icons/july.svg';
import August from '../assets/images/month-icons/august.svg';
import September from '../assets/images/month-icons/september.svg';
import October from '../assets/images/month-icons/october.svg';
import November from '../assets/images/month-icons/november.svg';
import December from '../assets/images/month-icons/december.svg';

import {
  convertToLongDateString,
  convertStringToDate,
} from '../utilities/helper';

export type DiaryCardHeaderProps = {
  diaryId: string;
  title: string;
  postDate: string;
  onClickCardHeaderAction: (diaryId: string) => void;
};

const DiaryCardHeader = (props: DiaryCardHeaderProps) => {
  const dispatch = useDispatch();
  const { onClickCardHeaderAction, diaryId, title, postDate } = props;

  // menuの開閉状態を管理
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // ダイアログの表示・非表示
  const [openDialog, setOpenDialog] = React.useState(false);

  // menuの開閉
  const openMenu = Boolean(anchorEl);
  // MoreVerIconクリック
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // menuを閉じる
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // ダイアログ表示
  const handleClickOpenDialog = () => {
    handleCloseMenu();
    setOpenDialog(true);
  };

  // 編集メニュークリック
  const handleEdit = () => {
    handleCloseMenu();
    return onClickCardHeaderAction(diaryId);
  };

  // 削除メニュークリック
  const handleDelete = () => {
    handleClickOpenDialog();
  };

  // ダイアログ非表示
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // ダイアログの削除ボタンクリック
  const handleConfirmDelete = () => {
    setOpenDialog(false);
    // return onClickCardHeaderAction(diaryId, 'DELETE');
    dispatch(deleteDiaryActionCreator({ diaryId }));
  };

  // postDate:YYYYMMDDから月を取得し
  const datePosted: Date = convertStringToDate(postDate);
  let avatarSrc;
  // useEffect(() => {
  switch (datePosted.getMonth()) {
    case 0:
      avatarSrc = January;
      break;
    case 1:
      avatarSrc = February;
      break;
    case 2:
      avatarSrc = March;
      break;
    case 3:
      avatarSrc = April;
      break;
    case 4:
      avatarSrc = May;
      break;
    case 5:
      avatarSrc = Jun;
      break;
    case 6:
      avatarSrc = July;
      break;
    case 7:
      avatarSrc = August;
      break;
    case 8:
      avatarSrc = September;
      break;
    case 9:
      avatarSrc = October;
      break;
    case 10:
      avatarSrc = November;
      break;
    case 11:
      avatarSrc = December;
      break;
    default:
      break;
  }

  const posted = convertToLongDateString(postDate);

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 58, height: 58 }}
            variant='square'
            aria-label={`投稿日:${posted}`}
            src={avatarSrc}
          />
        }
        action={
          <IconButton aria-label='settings' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={posted}
      />
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          編集
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize='small' />
          </ListItemIcon>
          削除
        </MenuItem>
      </Menu>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>削除の確認だお〜</DialogTitle>
        <DialogContent>
          <DialogContentText>
            削除すると、基には戻せないお〜！それでも削除するのかお〜？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleConfirmDelete}>削除</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiaryCardHeader;
