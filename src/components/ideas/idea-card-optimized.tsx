'use client';

import { useState, useCallback } from 'react';
import { Share2, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IdeaCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  className?: string;
}

export function IdeaCardOptimized({ 
  id, 
  title, 
  description, 
  category, 
  keywords, 
  className 
}: IdeaCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Startup Idea: ${title}`,
          text: description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${title}: ${description}`);
        alert('Idea copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, [title, description]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  // Check if description is long enough to warrant expansion
  const isLongDescription = description.length > 120;
  const displayDescription = isExpanded ? description : (
    isLongDescription ? description.slice(0, 120) + "..." : description
  );

  return (
    <motion.div
      ref={(node) => {
        if (node && typeof IntersectionObserver !== 'undefined') {
          const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '100px',
            threshold: 0.1,
          });
          observer.observe(node);
          return () => observer.disconnect();
        }
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10',
        'transition-all duration-300 backdrop-blur-xl shadow-2xl shadow-black/20',
        'hover:border-white/30 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/40 hover:scale-[1.03]',
        'focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent',
        'h-full flex flex-col transform-gpu cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] pointer-events-none" />
      
      {/* Header section with category and icon */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl 
              bg-gradient-to-br from-white/15 to-white/5 text-white transition-all duration-300 
              group-hover:from-white/25 group-hover:to-white/10 group-hover:shadow-lg group-hover:shadow-white/10
              border border-white/10 group-hover:border-white/20">
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <div className="flex-1 min-w-0">
              <Badge 
                variant="outline" 
                className="bg-white/8 border-white/20 backdrop-blur-md text-white/90 hover:bg-white/12 
                transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-white/5 text-xs font-medium px-3 py-1.5"
              >
                {category}
              </Badge>
            </div>
          </div>
          
          <span className="text-xs text-white/30 font-mono tracking-wider bg-white/5 px-2 py-1 rounded-md border border-white/5">
            #{id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Title */}
        <motion.h3 
          className="text-lg font-semibold text-white mb-3 leading-tight group-hover:text-white/95 transition-colors duration-200"
          layout
        >
          {title}
        </motion.h3>
      </div>

      {/* Content section */}
      <div className="relative flex-1 px-6 pb-4">
        <motion.div 
          className="space-y-3"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Description */}
          <div className="space-y-2">
            <motion.p 
              className="text-sm text-white/75 leading-relaxed"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {displayDescription}
            </motion.p>
            
            {isLongDescription && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="inline-flex items-center text-xs text-white/50 hover:text-white/70 transition-colors duration-200
                  bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md border border-white/5 hover:border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isExpanded ? 'Show less' : 'Read more'}
                <ChevronRight className={cn(
                  "ml-1 h-3 w-3 transition-transform duration-200",
                  isExpanded && "rotate-90"
                )} />
              </motion.button>
            )}
          </div>

          {/* Keywords section */}
          {isVisible && keywords.length > 0 && (
            <motion.div 
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-1.5">
                {keywords.slice(0, isExpanded ? keywords.length : 4).map((keyword, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 
                    hover:bg-white/10 transition-all duration-200 cursor-default border border-white/5
                    hover:border-white/10 hover:shadow-sm hover:shadow-white/5 backdrop-blur-sm
                    hover:text-white/80"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {keyword}
                  </motion.span>
                ))}
                {!isExpanded && keywords.length > 4 && (
                  <motion.span 
                    className="inline-flex items-center rounded-full bg-white/3 px-2.5 py-1 text-xs font-medium text-white/40
                    border border-white/5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    +{keywords.length - 4}
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Footer section */}
      <div className="relative p-6 pt-4 border-t border-white/8 bg-gradient-to-r from-white/[0.02] to-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="font-mono tracking-wide">Startup Idea</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="origin-right"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-3 h-8 text-sm font-medium
              border border-white/5 hover:border-white/15 group/btn backdrop-blur-sm
              hover:shadow-md hover:shadow-white/5"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              <Share2 className="mr-2 h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform duration-200" />
              Share
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Hover highlight effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export const IdeaCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] h-full">
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-6 w-16 rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="h-4 w-12 rounded bg-white/5 animate-pulse" />
      </div>
      
      <div className="space-y-3">
        <div className="h-5 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-full rounded bg-white/8 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-white/8 animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-white/8 animate-pulse" />
      </div>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="h-6 w-16 rounded-full bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
    
    <div className="p-6 pt-4 border-t border-white/8">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
        <div className="h-8 w-16 rounded-lg bg-white/5 animate-pulse" />
      </div>
    </div>
  </div>
);