import mongoose, { Schema } from 'mongoose'

const lessonSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  video_url: {
    required: true,
    type: String,
  },
  published: {
    required: true,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  access: {
    required: true,
    type: String,
  },
})

export const LessonModel =
  mongoose.models.Lesson ?? mongoose.model('Lesson', lessonSchema)
