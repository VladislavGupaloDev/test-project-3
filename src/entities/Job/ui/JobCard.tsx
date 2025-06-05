import type { TJob } from '../model/types'
import { cn } from '@/shared/lib/helpers/cn'
import type { ComponentProps } from 'react'

export function JobCard({
  job,
  className,
  ...props
}: { job: TJob } & ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex w-full flex-col', className)}
      {...props}
    >
      <div className='truncate text-xl font-bold'>{job.title}</div>
      <span className='text-lg tabular-nums'>{job.salary}</span>
      <div>{job.experience}</div>
      <div>{job.location}</div>
    </div>
  )
}
