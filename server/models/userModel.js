import mongoose from 'mongoose';

const userModel = mongoose.Schema(
  {
    fs_name: {
      type: String,
      trim: true,
    },
    sur_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      // unique : [true, 'Already exists this email'],
      trim: true,
      default: null,
    },
    mobile: {
      type: String,
      trim: true,
      default: null,
      // unique : true
    },
    bio: {
      type: String,
      trim: true,
      default: null,
    },
    featured: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    photo: {
      type: String,
      default: null,
    },
    cover_photo: {
      type: String,
      default: null,
    },
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    college: {
      type: String,
    },
    subject: {
      type: String,
    },
    school: {
      type: String,
    },
    city: {
      type: String,
    },
    hometown: {
      type: String,
    },
    relationship: {
      type: String,
    },
    friend_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userModel);
