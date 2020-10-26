import React from 'react';
import AppBar from './AppBar';
import AppMenu from './AppMenu';
import Paper from 'material-ui/Paper';
import PanicImage from '../assets/img/404.gif';

export default function NotFound() {
  return (
    <section>
      <Paper zDepth={1} style={{position: 'fixed', width: '100%', zIndex: 10}}>
        <AppBar>
          <AppMenu />
        </AppBar>
      </Paper>
      <section style={{paddingTop: 50}}>
        <center>
          <h1>404 Not Found</h1>
          <img src={PanicImage} alt="404 gif" />
        </center>
      </section>
    </section>
  );
}
