import React from 'react';
import axios from 'axios';
import {
  TextField, Button, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Tabs, Tab,
  GridList, GridListTile, GridListTileBar, ButtonGroup,
} from '@material-ui/core';
import './App.css';

import Title from './components/Title';

function App() {

  const [title, setTitle] = React.useState('movie search');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [result, setResult] = React.useState(undefined);
  const [mode, setMode] = React.useState(0);

  const APICall = React.useCallback ( () => {
    setTitle(`search result of ${search}`)
    axios({
      "method":"GET",
      "url":"https://movie-database-imdb-alternative.p.rapidapi.com/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"movie-database-imdb-alternative.p.rapidapi.com",
      "x-rapidapi-key":"ed7fde0a9cmshc202e0473cb33c2p17f7f2jsnb33de64f6ded"
      },"params":{
      "page":page,
      "r":"json",
      "s":search
      }
      })
      .then((response)=>{
        setResult(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  },[page, search])

  React.useEffect(() => {
    if(page <= 1){
      return
    }
    APICall()
  },[APICall, page])

  function handlePage(value){
    setPage(value);
  }

  function handleTab(event, newValue) {
    setMode(newValue);
  }

  function handleSearch(value){
    setSearch(value);
  };

  return (
    <div className="App">
      <Title title={title}/>
      <Grid container spacing={2} justify='center' alignItems='center' className='container' style={{paddingTop:72}}>
        <Grid item>
          <TextField
            placeholder='search movie...'
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            variant='outlined'
            autoFocus
            />
        </Grid>
        <Grid item>
          <Button variant='outlined' color='primary' size='small'
            onClick={() => APICall()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={11}>
          {result !== undefined &&
          <React.Fragment>
            <Tabs
              value={mode}
              onChange={handleTab}
              indicatorColor='primary'
              textColor='primary'
              centered>
                <Tab label='List' />
                <Tab label='Grid' />
            </Tabs>
            {mode === 0 &&
            <List>
              {result.data.Search.map(movie => (
                <ListItem key={movie.imdbID} divider alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar alt={movie.Title} src={movie.Poster} />
                  </ListItemAvatar>
                  <ListItemText primary={movie.Title}
                    secondary={
                      <>
                        <Typography variant='body2' component='span' color='textSecondary'>
                          {movie.Type}
                        </Typography>
                        <Typography variant='body2' component='span' color='textSecondary'>
                          {movie.Year}
                        </Typography>
                      </>
                    }
                  />
                  <Button size='small'href={`https://www.imdb.com/title/${movie.imdbID}`} target='_blank'
                    variant='outlined' color='primary'>
                      Go IMDb
                    </Button>
                </ListItem>
              ))}
            </List>
            }
            {mode === 1 &&
              <GridList cellHeight={180} cols={5} spacing={8}>
                {result.data.Search.map(movie => (
                  <GridListTile key={movie.imdbID} >
                    <a href={`https://www.imdb.com/title/${movie.imdbID}`} >
                    <img src={movie.Poster} alt={movie.Title}
                      style={{width:'auto', height:'auto', maxWidth:'100%', maxHeight:'100%'}}
                    />
                    </a>
                    <GridListTileBar
                      title={movie.Title}
                      />
                  </GridListTile>
                ))}
              </GridList>
            }
            <ButtonGroup color='primary' style={{paddingTop:8}}>
              <Button onClick={() => handlePage(page-1)}>Prev</Button>
              <Button onClick={() => handlePage(page+1)}>Next</Button>
            </ButtonGroup>
          </React.Fragment>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
