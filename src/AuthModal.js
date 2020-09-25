import React, { memo } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, makeStyles, TextField } from '@material-ui/core';
import useInputState from './hooks/useInputState';
import { auth } from './firebase';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid lightgray',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  logo: {
    objectFit: 'contain',
    height: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
function AuthModal({ isOpen, setOpen, type }) {
  console.log('authmodal re render');
  const [username, handleUsername] = useInputState('');
  const [email, handleEmail] = useInputState('');
  const [password, handlePassword] = useInputState('');
  const classes = useStyles();

  const handleRegister = (evt) => {
    evt.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isOpen}
        onClose={() => setOpen(false)}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <form
              autoComplete='off'
              className={classes.form}
              onSubmit={type === 'register' ? handleRegister : handleLogin}
            >
              <img
                className={classes.logo}
                alt='Instagram logo'
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F2a%2FInstagram_logo.svg%2F1200px-Instagram_logo.svg.png&f=1&nofb=1'
              />
              <p>{type === 'login' ? 'Sign In' : 'Sign up'}</p>

              {type === 'register' && (
                <TextField
                  value={username}
                  onChange={handleUsername}
                  margin='normal'
                  type='text'
                  label='Username'
                  id='username'
                />
              )}
              <TextField
                value={email}
                onChange={handleEmail}
                margin='normal'
                type='text'
                label='Email'
                id='email'
              />
              <TextField
                value={password}
                onChange={handlePassword}
                margin='normal'
                type='password'
                label='Password'
                id='password'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default memo(AuthModal);
