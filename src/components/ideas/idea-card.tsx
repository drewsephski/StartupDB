'use client';

import { cn } from '@/lib/utils';
import { Share2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

type IdeaCardProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  className?: string;
};

export function IdeaCard({ id, title, description, category, keywords, className }: IdeaCardProps) {
  const handleShare = async () => {
    const shareData = {
      title: `Startup Idea: ${title}`,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${title}: ${description}`);
        alert('Idea copied to clipboard!');
      }
      // Log the share action (you can replace this with your analytics)
      console.log('Shared idea:', id);
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm bg-white/5',
        'transition-all duration-200 hover:bg-white/10 hover:border-white/20',
        'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent',
        'h-full flex flex-col',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl
          bg-gradient-to-br from-white/10 to-white/5 text-white transition-all duration-300
          group-hover:from-white/20 group-hover:to-white/10 group-hover:shadow-lg group-hover:shadow-white/5">
          <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-white/80 line-clamp-3 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {keywords.length > 0 && (
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {keywords.slice(0, 3).map((keyword, i) => (
              <motion.span
                key={i}
                className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80
                hover:bg-white/10 transition-all duration-200 cursor-default border border-white/5
                hover:border-white/10 hover:shadow-sm hover:shadow-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {keyword}
              </motion.span>
            ))}
            {keywords.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50">
                +{keywords.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-white/40 font-mono tracking-wide">ID: {id.toString().padStart(3, '0')}</span>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="origin-right"
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-3 h-8 text-sm font-medium
            border border-white/5 hover:border-white/10 group"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-3.5 w-3.5 group-hover:rotate-12 transition-transform duration-200" />
            Share
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function IdeaCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-3/4 rounded bg-muted"></div>
        <div className="h-3 w-1/2 rounded bg-muted"></div>
        <div className="space-y-2">
          <div className="h-3 rounded bg-muted"></div>
          <div className="h-3 w-5/6 rounded bg-muted"></div>
          <div className="h-3 w-4/6 rounded bg-muted"></div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-5 w-16 rounded-full bg-muted"></div>
          <div className="h-5 w-20 rounded-full bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
