import React from 'react'
import user_img from '../../assets/images/user.png'

const CreatePost = () => {
  return (
    <div>
        <div className="create-post">
              <div className="create-post-header">
                <img src={ user_img } alt="" />
                <button>Whats on your mind ?</button>
              </div>
              <div className="divider-0"></div>
              <div className="create-post-footer">
                <ul>
                  <li>
                    <div className="post-icon"></div>
                    <span>Live Video</span>
                  </li>
                  <li>
                    <div className="post-icon"></div>
                    Photo/video
                  </li>
                  <li>
                    <div className="post-icon"></div>
                    Feeling/Activity
                  </li>
                </ul>
              </div>
            </div>
    </div>
  )
}

export default CreatePost