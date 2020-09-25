import { Button } from '@material-ui/core';
import React, { memo } from 'react';
import useStyles from './Navbar.styles';
import { auth } from './firebase';
function Navbar({ setRegister, setLogin, user }) {
  console.log('Navbar re render');
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img
        className={classes.headerImage}
        alt='Instagram logo'
        src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F2a%2FInstagram_logo.svg%2F1200px-Instagram_logo.svg.png&f=1&nofb=1'
      />
      {user ? (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      ) : (
        <div>
          <Button onClick={() => setRegister(true)}>Sign Up</Button>
          <Button onClick={() => setLogin(true)}>Sign In</Button>
        </div>
      )}
    </div>
  );
}

export default memo(Navbar);
