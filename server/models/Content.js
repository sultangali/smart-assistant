import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    sectionId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'ru',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Content', ContentSchema);
