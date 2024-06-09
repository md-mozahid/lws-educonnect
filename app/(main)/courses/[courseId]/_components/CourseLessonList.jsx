import { cn } from '@/lib/utils'
import { getLessons } from '@/queries/lesson'
import { Tv } from 'lucide-react'

export default async function CourseLessonList({lessonId}) {
  const lessons = await getLessons(lessonId)
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
      )}>
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn('text-slate-500')} />
        {lessons?.title}
      </div>
    </button>
  )
}
