import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  posts: {
    width: 'fit-content',
  },
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  embed: {
    marginLeft: '20px',
  },
}));
