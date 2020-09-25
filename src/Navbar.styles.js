import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    borderBottom: '1px solid lightgray',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0',
    zIndex: '10',
  },
  headerImage: {
    objectFit: 'contain',
    height: '50px',
  },
}));
