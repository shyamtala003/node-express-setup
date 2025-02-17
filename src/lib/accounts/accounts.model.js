import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import defaultSchemaConfig from '../../configs/mongooseSchemaConfig.js';

const accountSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Account already exists with this email'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      avatar: {
        type: String,
      },
    },
  },
  defaultSchemaConfig
);

// Middleware to hash the password before saving
accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
accountSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find an account by email
accountSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const account = model('Account', accountSchema);

export default account;
