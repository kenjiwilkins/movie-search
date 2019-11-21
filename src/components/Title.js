import React from 'react';
import {AppBar, Toolbar, Grid, Typography} from '@material-ui/core';

function Title(props) {
  return (
    <div>
      <AppBar color='inherit'>
        <Toolbar>
          <Grid container spacing={3} justify='space-between' alignItems='center'>
            <Grid item xs={4}>
              <Typography variant='h4' color='primary'>
                {props.title}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant='caption' color='textSecondary'>
                Copyright Kenji Wilkins 2019
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Title;
