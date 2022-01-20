import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Diary } from '../diaryData';
import DiaryCardHeader from './DiaryHeader';

export type DiaryCardProps = {
  diary: Diary;
  onClickCardHeaderAction: (diaryId: string, mode: string) => void;
};

// アイコンクリックで詳細部分を表示するためのコンポーネントのpros型
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// アイコンクリックで詳細部分を表示するコンポーネント
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// DiaryCardコンポーネント
const DiaryCard = (props: DiaryCardProps) => {
  // 詳細表示コンポーネントの表示・非表示の状態
  const [expanded, setExpanded] = React.useState(false);

  // 詳細コンポーネントの表示・非表示を切り替える関数
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 受け取ったオブジェクトを変数に展開
  const { diary, onClickCardHeaderAction } = props;
  const {
    diaryId,
    title,
    postDate,
    imageUrl,
    imageLabel,
    mainContent,
    readmore,
  } = diary;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <DiaryCardHeader
        diaryId={diaryId}
        title={title}
        postDate={postDate}
        onClickCardHeaderAction={onClickCardHeaderAction}
      />
      <CardMedia
        component='img'
        height='194'
        image={imageUrl}
        alt={imageLabel}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {mainContent}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {readmore.map((parag, index) => (
            <Typography paragraph key={`${diaryId}${index.toString()}`}>
              {parag}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default DiaryCard;
