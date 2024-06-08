import { replaceMongoIdInArray } from '@/lib/convertData'
import { TestimonialModel } from '@/models/testimonial-model'

export async function getTestimonialsForCourse(courseId) {
  const testimonials = await TestimonialModel.find({
    courseId: courseId,
  }).lean()
  return replaceMongoIdInArray(testimonials)
}
