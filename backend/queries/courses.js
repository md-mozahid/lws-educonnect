import { CategoryModel } from '../models/categoryModel'
import { CourseModel } from '../models/course-model'
import { ModuleModel } from '../models/module-model'
import { TestimonialModel } from '../models/testimonial-model'
import { UserModel } from '../models/user-model'

export async function getCourses() {
  const courses = await CourseModel.find({})
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

  return courses
}
