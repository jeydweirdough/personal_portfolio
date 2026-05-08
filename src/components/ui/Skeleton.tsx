import React from 'react'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-100 dark:bg-bg-dark-soft rounded-md ${className}`} />
  )
}

export function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark rounded-2xl p-6 h-[220px] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <Skeleton className="w-48 h-48 rounded-3xl" />
        <div className="flex-1 space-y-6 w-full">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
