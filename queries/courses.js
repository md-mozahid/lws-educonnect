import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/lib/convertData'
import { CategoryModel } from '@/models/categoryModel'
import { CourseModel } from '@/models/course-model'
import { ModuleModel } from '@/models/module-model'
import { TestimonialModel } from '@/models/testimonial-model'
import { UserModel } from '@/models/user-model'
import { getEnrollmentsForCourse } from './enrollments'
import { getTestimonialsForCourse } from './testimonials'

export async function getCourseList() {
  const courses = await CourseModel.find({})
    .select([
      'title',
      'subtitle',
      'thumbnail',
      'modules',
      'price',
      'category',
      'instructor',
    ])
    .populate({
      path: 'category',
      model: CategoryModel,
    })
    .populate({
      path: 'instructor',
      model: UserModel,
    })
    .populate({
      path: 'testimonials',
      model: TestimonialModel,
    })
    .populate({
      path: 'modules',
      model: ModuleModel,
    })
    .lean()
  return replaceMongoIdInArray(courses)
}

export async function getSingleCourse(id) {
  const course = await CourseModel.findById(id)
    .populate({
      path: 'category',
      model: CategoryModel,
    })
    .populate({
      path: 'instructor',
      model: UserModel,
    })
    .populate({
      path: 'testimonials',
      model: TestimonialModel,
      populate: {
        path: 'user',
        model: UserModel,
      },
    })
    .populate({
      path: 'modules',
      model: ModuleModel,
    })
    .lean()

  return replaceMongoIdInObject(course)
}
// return a promise
// in that case return resolve value so that why call promise.all()
export async function getCourseDetailsByInstructor(instructorId) {
  const courses = await CourseModel.find({ instructor: instructorId }).lean()

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course?._id.toString())
      return enrollment
    })
  )
  // find total enrollment
  const totalEnrollments = enrollments.reduce((item, currentValue) => {
    return item.length + currentValue.length
  })

  // find total reviews
  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course?._id.toString())
      return testimonial
    })
  )
  const totalTestimonials = testimonials.flat()

  // calculate avg rating
  const avgRatings =
    totalTestimonials.reduce((acc, obj) => {
      return acc + obj.rating
    }, 0) / totalTestimonials.length

  // console.log('testimonials', testimonials)
  return {
    courses: courses?.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRatings.toPrecision(2),
  }
}
