import { useState, useMemo, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input, Textarea } from '../components/ui/Input'
import projects from '../data/projects.json'
import { ProgressBar } from '../components/ui/ProgressBar'

interface ProjectDetailsProps {
  projectId: number
  onBack: () => void
}

const StarRating = ({ rating, size = "sm" }: { rating: number, size?: "xs" | "sm" | "md" }) => {
  const sizeClass = size === "xs" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-4 h-4"
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${sizeClass} ${s <= rating ? 'text-accent-orange fill-accent-orange' : 'text-slate-200 dark:text-border-dark'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Particle/Puff Effect Component
const MagicalPuff = ({ x, y, onComplete }: { x: number, y: number, onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed pointer-events-none z-[300]" style={{ left: x, top: y }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent-orange animate-puff"
          style={{
            '--tx': `${(Math.random() - 0.5) * 40}px`,
            '--ty': `${(Math.random() - 0.5) * 40}px`,
            animationDelay: `${Math.random() * 0.1}s`,
          } as any}
        />
      ))}
    </div>
  )
}

function ProjectDetails({ projectId, onBack }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [puffs, setPuffs] = useState<{ id: number, x: number, y: number }[]>([])
  
  const project = useMemo(() => projects.find(p => p.id === projectId) || projects[0], [projectId])

  const handleStarClick = (s: number, e: React.MouseEvent) => {
    setUserRating(s)
    const newPuff = { id: Date.now(), x: e.clientX, y: e.clientY }
    setPuffs(prev => [...prev, newPuff])
  }

  const removePuff = (id: number) => {
    setPuffs(prev => prev.filter(p => p.id !== id))
  }

  // Statistics
  const reviews = project.reviews || []
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    return (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
  }, [reviews])

  const latestHighestReview = useMemo(() => {
    if (reviews.length === 0) return null
    const maxRating = Math.max(...reviews.map(r => r.rating))
    const highestReviews = reviews.filter(r => r.rating === maxRating)
    return highestReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  }, [reviews])

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-12 animate-fade-in relative">
      {/* Particle Effects */}
      {puffs.map(p => (
        <MagicalPuff key={p.id} x={p.x} y={p.y} onComplete={() => removePuff(p.id)} />
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col gap-4">
             <div className="flex justify-end">
                <button className="text-white hover:text-accent-orange transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <img src={selectedImage} alt="Project Documentation" className="w-full h-full object-contain rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-8" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>}>
          Back to Projects
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="accent">{project.tag}</Badge>
              <span className="text-sm text-text-light-secondary">{project.region}</span>
              {averageRating !== 0 && (
                <div className="flex items-center gap-2 ml-auto">
                  <StarRating rating={Number(averageRating)} size="xs" />
                  <span className="text-xs font-bold">{averageRating}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary sm:text-5xl mb-6">
              {project.name}
            </h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-10 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Status', value: project.status, color: project.status === 'Active' ? 'text-emerald-500' : 'text-slate-400' },
                { label: 'Provider', value: project.provider },
                { label: 'Framework', value: project.framework },
                { label: 'Database', value: project.database }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-sm font-semibold ${stat.color || 'text-text-light-primary dark:text-text-dark-primary'}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-12">
               <h3 className="text-xl font-bold">Key Features</h3>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   'Real-time message processing with low latency.',
                   'Custom NLP models for industry-specific terminology.',
                   'Seamless integration with Discord, Slack, and Telegram.',
                   'Comprehensive analytics dashboard for usage tracking.'
                 ].map((feature, i) => (
                   <li key={i} className="flex gap-3 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-orange shrink-0"></div>
                      {feature}
                   </li>
                 ))}
               </ul>
            </div>

            {/* Featured Review */}
            {latestHighestReview && (
              <div className="mb-12 p-6 rounded-2xl bg-accent-orange/5 border border-accent-orange/10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-16 h-16 text-accent-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 15.5523 13.4647 16 14.017 16H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V15C5.017 15.5523 5.46472 16 6.017 16H5.017V21H6.017Z" /></svg>
                 </div>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-accent-orange flex items-center justify-center text-white text-[10px] font-bold">
                       {latestHighestReview.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                       <p className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary">{latestHighestReview.user}</p>
                       <StarRating rating={latestHighestReview.rating} size="xs" />
                    </div>
                    <span className="ml-auto text-[10px] font-bold text-accent-orange uppercase tracking-wider bg-accent-orange/10 px-2 py-0.5 rounded">Featured Review</span>
                 </div>
                 <p className="text-sm italic text-text-light-secondary dark:text-text-dark-secondary relative z-10">"{latestHighestReview.comment}"</p>
              </div>
            )}

            {/* Photo Documentation */}
            <div className="mb-12">
               <h3 className="text-xl font-bold mb-6">Photo Documentation</h3>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.documentation?.map((doc, i) => (
                    <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-border-light dark:border-border-dark cursor-zoom-in hover:border-accent-orange/50 transition-all" onClick={() => setSelectedImage(doc.url)}>
                       <img src={doc.url} alt={doc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-[10px] font-bold text-white uppercase tracking-wider">{doc.title}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Reviews List */}
            <div className="mb-12">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold">User Reviews</h3>
                  <span className="text-xs text-text-light-secondary">{reviews.length} total reviews</span>
               </div>
               
               <div className="space-y-6">
                  {reviews.map((rev, i) => (
                    <div key={i} className="pb-6 border-b border-border-light dark:border-border-dark last:border-0">
                       <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                             <p className="text-sm font-bold">{rev.user}</p>
                             <StarRating rating={rev.rating} size="xs" />
                          </div>
                          <span className="text-[10px] text-text-light-secondary">{rev.date}</span>
                       </div>
                       <p className="text-sm text-text-light-secondary leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Add Review Form */}
            <Card className="p-8">
               <h3 className="text-lg font-bold mb-6">Leave a Review</h3>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <p className="text-xs font-bold uppercase tracking-wider text-text-light-secondary">Rating</p>
                     <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map(s => (
                          <button 
                            key={s} 
                            onClick={(e) => handleStarClick(s, e)}
                            onMouseEnter={() => setHoverRating(s)}
                            className={`transition-all duration-200 hover:scale-125 ${s <= (hoverRating || userRating) ? 'text-accent-orange fill-current' : 'text-slate-200 dark:text-border-dark'}`}
                          >
                             <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                             </svg>
                          </button>
                        ))}
                     </div>
                     {userRating > 0 && <span className="text-sm font-bold text-accent-orange">{userRating} / 5</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Input label="Full Name" placeholder="Jane Doe" />
                     <Input label="Email Address" placeholder="jane@example.com" />
                  </div>
                  <Textarea label="Your Comment" placeholder="What do you think about this project?" rows={4} />
                  <Button variant="primary" className="w-full sm:w-auto">Submit Review</Button>
               </div>
            </Card>
          </div>

          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <Card className="p-6">
              <h4 className="text-xs font-bold text-text-light-secondary uppercase tracking-wider mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">Open Live Demo</Button>
                <Button variant="outline" className="w-full">View Repository</Button>
              </div>
            </Card>

            <Card className="p-6 bg-slate-50 dark:bg-bg-dark-soft border-dashed">
               <h4 className="text-xs font-bold text-text-light-secondary uppercase tracking-wider mb-2">Usage Limit</h4>
               <ProgressBar 
                 progress={project.usage} 
                 size="xs" 
                 showValue={false} 
                 className="mt-4"
                 isAnimated={false}
               />
               <div className="flex justify-between mt-2">
                 <span className="text-[10px] font-bold text-text-light-primary dark:text-text-dark-primary">{project.usage}% used</span>
                 <span className="text-[10px] text-text-light-secondary">Limit: {project.limit}</span>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
