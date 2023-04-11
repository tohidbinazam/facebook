import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { getSinglePost } from '../../redux/post/action';
import Header from '../../components/Header/Header';

const SinglePost = () => {
  const { postId } = useParams();
  const { single_post } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  return (
    <>
      <Header />
      <div>
        {single_post ? <Post post={single_post} /> : <h1>Loading...</h1>}
      </div>
    </>
  );
};

export default SinglePost;
