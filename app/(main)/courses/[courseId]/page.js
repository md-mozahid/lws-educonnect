import { getSingleCourse } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseIntro from "./_components/CourseIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";
import { replaceMongoIdInArray } from "@/lib/convertData";



export default async function SingleCoursePage({ params: { courseId } }) {
  const course = await getSingleCourse(courseId);
  // console.log(course.testimonials);
  return (
    <>
      <CourseIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
      <CourseDetails course={course} />
      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      <RelatedCourse  />
    </>
  );
}
