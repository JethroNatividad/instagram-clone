import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import Post from './Post';
import useStyles from './PostList.styles';
function PostList({ posts, user }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.posts}>
        {posts.map((post) => (
          <Post
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            id={post.id}
            key={post.id}
          />
        ))}
      </div>
      <div className={classes.embed}>
        <InstagramEmbed
          url='https://www.instagram.com/tv/B-NK7ZYgntC/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
    </div>
  );
}

export default PostList;
