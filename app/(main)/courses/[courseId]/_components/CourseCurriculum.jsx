import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  BookCheck,
  Clock10,
  FileQuestion,
  NotepadText,
  Radio,
  StickyNote,
  Tv,
  Video,
} from "lucide-react";
import CourseModuleList from "./CourseModuleList";

export default function CourseCurriculum({ modules }) {
  const totalDuration = modules?.reduce((acc, obj) => acc + obj.duration, 0)
  return (
    <>
      {/* each tab content can be independent component */}
      <div class="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration / 60).toFixed(2)} Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={['item-1', 'item-2', 'item-3']}
        type="multiple"
        collapsible
        className="w-full">
        {
          modules && modules?.map((module) => (
            <CourseModuleList key={module?.title} module={module} />
          ))
        }
      </Accordion>
      {/* contents end */}
    </>
  )
}
