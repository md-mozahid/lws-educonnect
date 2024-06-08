import { getSingleCourse } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseIntro from "./_components/CourseIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";
import { replaceMongoIdInArray } from "@/lib/convertData";

const courses = [
  {
    id: 1,
    title: "Design",
    thumbnail: "/assets/images/categories/design.jpg",
  },

  {
    id: 3,
    title: "Development",
    thumbnail: "/assets/images/categories/development.jpg",
  },
  {
    id: 4,
    title: "Marketing",
    thumbnail: "/assets/images/categories/marketing.jpg",
  },
  {
    id: 5,
    title: "IT & Software",
    thumbnail: "/assets/images/categories/it_software.jpg",
  },
  {
    id: 6,
    title: "Personal Development",
    thumbnail: "/assets/images/categories/personal_development.jpg",
  },
  {
    id: 7,
    title: "Business",
    thumbnail: "/assets/images/categories/business.jpg",
  },
  {
    id: 8,
    title: "Photography",
    thumbnail: "/assets/images/categories/photography.jpg",
  },
  {
    id: 9,
    title: "Music",
    thumbnail: "/assets/images/categories/music.jpg",
  },
];

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
      <CourseDetails />
      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      <RelatedCourse courses={courses} />
    </>
  );
}
