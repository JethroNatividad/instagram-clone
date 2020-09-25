import React, { useState, useEffect } from 'react';
import styles from './App.styles';
import { db, auth } from './firebase';

import Upload from './Upload';
import Navbar from './Navbar';
import PostList from './PostList';
import AuthModal from './AuthModal';
function App() {
  //regiser / login modals toggle state
  const [isRegisterOpen, setRegister] = useState(false);
  const [isLoginOpen, setLogin] = useState(false);
  const classes = styles();
  //posts state
  const [posts, setPosts] = useState([]);
  //user state
  const [user, setUser] = useState(null);

  //useEffect that fetches posts
  useEffect(() => {
    const unsubscribe = db //finds collection named posts in the firestore
      .collection('posts')
      //orders it by timestapm
      .orderBy('timestamp', 'desc')
      //listens to any changes and re renders it
      .onSnapshot((snapshot) => {
        //  caption, picture etc.  document id
        //map every doc inside the collection         v             v
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    return () => {
      unsubscribe();
    };
  });

  //useEffect that listens to any auth in user
  useEffect(() => {
    //                        listens on any auths
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //if there is an authenticated user
      if (authUser) {
        //set the user state to the authenticated user
        setUser(authUser);
      } else {
        //else set the user state to null
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className={classes.root}>
      <Navbar user={user} setLogin={setLogin} setRegister={setRegister} />
      <PostList posts={posts} user={user} />
      <AuthModal isOpen={isLoginOpen} setOpen={setLogin} type='login' />
      <AuthModal
        isOpen={isRegisterOpen}
        setOpen={setRegister}
        type='register'
      />

      {user && <Upload username={user.displayName} />}
    </div>
  );
}

export default App;
