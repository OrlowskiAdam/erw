import React from 'react';
import AppBar from './AppBar';
import AppMenu from './AppMenu';
import Paper from 'material-ui/Paper';

export default function NotFound() {
  return (
    <Paper zDepth={1} style={{position: 'fixed', width: '100%', zIndex: 10}}>
      <AppBar>
        <AppMenu />
      </AppBar>
    </Paper>
  );
}
