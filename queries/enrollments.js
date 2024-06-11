import { replaceMongoIdInArray } from '@/lib/convertData'
import { EnrollmentModel } from '@/models/enrollment-model'

export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await EnrollmentModel.find({ course: courseId }).lean()
  return replaceMongoIdInArray(enrollments)
}

export async function enrollForCourse(courseId, userId, paymentMethod) {
  const newEnrollment = {
    course: courseId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: 'not-started',
  }

  try {
    const response = await EnrollmentModel.create(newEnrollment)
    return response
  } catch (error) {
    throw new Error(error)
  }
}