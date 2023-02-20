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
