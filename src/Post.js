import { Avatar } from '@material-ui/core';
import React, { useEffect, useState, memo } from 'react';
import styles from './Post.styles';
import { db } from './firebase';
import useInputState from './hooks/useInputState';
import firebase from 'firebase';
function Post({ username, imageUrl, caption, id, user }) {
  const [comments, setComments] = useState([]);
  const [comment, handleComment, reset] = useInputState('');
  const classes = styles();

  useEffect(() => {
    db.collection('posts')
      .doc(id)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    reset();
  };
  return (
    <div className={classes.root}>
      {/* avatar + username */}
      <div className={classes.header}>
        <Avatar
          className={classes.avatar}
          alt={username}
          src='/static/images/avatar/1.jpg'
        />
        <h3>{username}</h3>
      </div>

      {/* image */}

      <img className={classes.image} src={imageUrl} alt='' />

      {/* username + caption */}
      <p className={classes.caption}>
        <strong>{username}:</strong> {caption}
      </p>
      <div className={classes.commentList}>
        {comments.map((comment) => (
          <p key={comment.id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      <div className={classes.commentForm}>
        <input
          disabled={!user}
          placeholder={`${
            user ? 'Add a comment...' : 'You must be logged in to comment'
          }`}
          value={comment}
          onChange={handleComment}
        />
        <button onClick={handleSubmit} disabled={!comment}>
          Post
        </button>
      </div>
    </div>
  );
}

export default memo(Post);
