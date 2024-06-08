import { replaceMongoIdInArray } from '@/lib/convertData'
import { EnrollmentModel } from '@/models/enrollment-model'

export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await EnrollmentModel.find({ course: courseId }).lean()
  return replaceMongoIdInArray(enrollments)
}
