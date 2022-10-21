import mongoose from 'mongoose';

const { Schema } = mongoose;

const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Token', TokenSchema);
