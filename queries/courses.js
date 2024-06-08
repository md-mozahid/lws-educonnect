import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/lib/convertData'
import { CategoryModel } from '@/models/categoryModel'
import { CourseModel } from '@/models/course-model'
import { ModuleModel } from '@/models/module-model'
import { TestimonialModel } from '@/models/testimonial-model'
import { UserModel } from '@/models/user-model'

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
    })
    .populate({
      path: 'modules',
      model: ModuleModel,
    })
    .lean()

  return replaceMongoIdInObject(course)
}
