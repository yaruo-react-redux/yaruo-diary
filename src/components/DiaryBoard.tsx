import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright = () => (
  <Typography variant='body2' color='text.secondary' align='center'>
    {'Copyright © '}
    <Link color='inherit' href='https://mui.com/'>
      Your Website
    </Link>
    {` ${new Date().getFullYear()}.`}
  </Typography>
);

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DiaryBoard = () => (
  <>
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' color='inherit' noWrap>
          やる夫の読書日記
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <Container sx={{ py: 8 }} maxWidth='md'>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image='https://source.unsplash.com/random'
                  alt='random'
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>View</Button>
                  <Button size='small'>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
    {/* Footer */}
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
      <Typography variant='h6' align='center' gutterBottom>
        Footer
      </Typography>
      <Typography
        variant='subtitle1'
        align='center'
        color='text.secondary'
        component='p'
      >
        Something here to give the footer a purpose!
      </Typography>
      <Copyright />
    </Box>
    {/* End footer */}
  </>
);

export default DiaryBoard;
