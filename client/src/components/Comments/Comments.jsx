import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Post from '../Post/Post';
import { MdSend } from 'react-icons/md';
import './Comments.css';
import ShowProfile from '../ShowProfile/ShowProfile';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentLike,
  getComment,
  postComment,
  removeCommentLike,
} from '../../redux/post/action';
import timeAgo from '../../utility/timeAgo/timeAgo';
import findId from '../../utility/findId/findId';

const Comments = ({ post, setShow }) => {
  const { fs_name } = post.userId;

  const { comments, loading } = useSelector((state) => state.post);
  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const handleComment = (e) => {
    dispatch(postComment(post._id, { userId: _id, text }));
    setText('');
  };

  const handleLike = (e, commentId) => {
    const { classList } = e.target;
    const check = classList.contains('active');
    const data = { commentId, userId: _id };
    if (check) {
      dispatch(removeCommentLike(post._id, data));
    } else {
      dispatch(addCommentLike(post._id, data));
    }
  };

  useEffect(() => {
    dispatch(getComment(post._id));
  }, [dispatch, post._id]);

  return (
    <>
      <div className='modal-canter'>
        <div className='modal'>
          <div className='modal-header'>
            <div className='header-left'>
              <h3>{fs_name}'s Post</h3>
            </div>
            <div className='header-right'>
              <button onClick={() => setShow(false)}>
                <RxCross2 />
              </button>
            </div>
          </div>
          <div className='modal-body'>
            <Post post={post} />
            <div className='comments'>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                comments &&
                comments.map((comment, index) => (
                  <div className='comment' key={index}>
                    <div className='comment-left'>
                      <img
                        src='https://www.w3schools.com/howto/img_avatar.png'
                        alt='Avatar'
                      />
                    </div>
                    <div className='comment-right'>
                      <div className='commenter-name'>
                        <h5>{`${comment.user.fs_name} ${comment.user.sur_name}`}</h5>
                        <p>{comment.text}</p>
                      </div>
                      <div className='comment-time'>
                        <h6
                          className={`like ${
                            findId(_id, comment.likes) && 'active'
                          }`}
                          onClick={(e) => handleLike(e, comment._id)}
                        >
                          {comment.likes.length} Like
                        </h6>
                        <h6 className='time'>{timeAgo(comment.date)}</h6>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className='send-comment'>
            <div className='comment-profile'>
              <ShowProfile />
            </div>
            <input
              type='text'
              name='text'
              value={text}
              onKeyUp={(e) => e.keyCode === 13 && handleComment()}
              onChange={(e) => setText(e.target.value)}
              placeholder='Write a comment...'
            />
            <button onClick={handleComment}>
              <MdSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
