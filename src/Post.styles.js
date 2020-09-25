import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    maxWidth: '520px',
    backgroundColor: '#fff',
    border: '1px solid lightgray',
    marginBottom: theme.spacing(5),
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    borderTop: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  caption: {
    padding: theme.spacing(2),
  },
  commentList: {
    padding: '15px',
    borderTop: '1px solid lightgray',
  },
  commentForm: {
    padding: '5px',
    display: 'flex',
    borderTop: '1px solid lightgray',
    '& input': {
      flex: 1,
      outline: 'none',
      border: 'none',
      padding: '15px',
    },
    '& button': {
      flex: 0,
      border: 'none',
      background: 'white',
      color: '#405DE6',
      outline: 'none',
      cursor: 'pointer',
    },
  },
}));
