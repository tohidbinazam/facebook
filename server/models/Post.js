import { model, Schema } from 'mongoose';

const Post = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          required: true,
        },
        likes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model('Post', Post);
