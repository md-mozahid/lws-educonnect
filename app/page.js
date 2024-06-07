import { getCourses } from '@/backend/queries/courses'

export default async function Home() {
  const courses = await getCourses()
  console.log(courses)

  console.log(courses[0]?.instructor?.socialMedia)
  console.log(courses[0]?.testimonials)
  console.log(courses[0]?.modules)
  return <div>welcome</div>
}
