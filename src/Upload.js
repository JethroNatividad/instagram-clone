import React, { useState } from 'react';
import useInputState from './hooks/useInputState';
import useFileState from './hooks/useFileState';
import { storage, db } from './firebase';
import firebase from 'firebase';
import {
  Button,
  LinearProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
function Upload({ username }) {
  const classes = useStyles();
  const [caption, handleCaption, resetCaption] = useInputState('');
  const [image, handleFile, setImage] = useFileState('');
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        setProgress(progress);
      },
      (err) => {
        console.log(err);
        alert(err);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setImage('');
            resetCaption();
            setProgress(0);
          });
      }
    );
  };
  return (
    <div className={classes.root}>
      <LinearProgress variant='determinate' value={progress} />
      <TextField
        margin='normal'
        value={caption}
        onChange={handleCaption}
        id='caption'
        label='Caption'
        multiline
        rows={4}
        variant='outlined'
      />
      <input onChange={handleFile} type='file' />
      <Button
        onClick={handleUpload}
        variant='outlined'
        size='small'
        disableElevation
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;
