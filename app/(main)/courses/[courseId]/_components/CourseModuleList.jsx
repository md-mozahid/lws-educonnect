import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import {
  FileQuestion,
  NotepadText,
  Radio,
  StickyNote,
  Tv,
  Video,
} from 'lucide-react'

export default function CourseModuleList({module}) {
  return (
    <>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger>{module?.title}</AccordionTrigger>
        <AccordionContent>
          {/* header */}
          <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              {(module?.duration / 60).toPrecision(2)} Hours
            </span>
            <span className="flex items-center gap-1.5">
              <NotepadText className="w-4 h-4" />
              10 Notes
            </span>
            <span className="flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4" />
              10 Quiz
            </span>
            <span className="flex items-center gap-1.5">
              <Radio className="w-4 h-4" />1 Live Class
            </span>
          </div>
          {/* header ends */}

          <div className="space-y-3">
            {/* item */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
              )}>
              <div className="flex items-center gap-x-2">
                <Tv size={16} className={cn('text-slate-500')} />
                What is React ?
              </div>
            </button>
            {/* item ends */}
            {/* item */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
              )}>
              <div className="flex items-center gap-x-2">
                <Tv size={16} className={cn('text-slate-500')} />
                Learn React Basics
              </div>
            </button>
            {/* item ends */}
            {/* item */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
              )}>
              <div className="flex items-center gap-x-2">
                <Tv size={16} className={cn('text-slate-500')} />
                Build A Simple React App
              </div>
            </button>
            {/* item ends */}
            {/* item */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
              )}>
              <div className="flex items-center gap-x-2">
                <StickyNote size={16} className={cn('text-slate-500')} />
                React Basic Note
              </div>
            </button>
            {/* item ends */}
            {/* item */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
              )}>
              <div className="flex items-center gap-x-2">
                <StickyNote size={16} className={cn('text-slate-500')} />
                Project Requirement Analysis
              </div>
            </button>
            {/* item ends */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
