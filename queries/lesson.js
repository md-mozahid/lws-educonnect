import { replaceMongoIdInObject } from '@/lib/convertData'
import { LessonModel } from '@/models/lesson.model'

export async function getLessons(lessonId) {
  const lessons = await LessonModel.findById(lessonId).lean()
  return replaceMongoIdInObject(lessons)
}
