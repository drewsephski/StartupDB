'use client';

import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getIdeas, type Idea } from '@/lib/ideas';
import { Scene } from "@/components/ui/hero-section";
import { Search, Filter, Sparkles } from 'lucide-react';

// Dynamically import heavy components
const IdeaCardOptimized = lazy(() => import('@/components/ideas/idea-card-optimized').then(mod => ({ default: mod.IdeaCardOptimized })));
const IdeaCardSkeleton = lazy(() => import('@/components/ideas/idea-card-optimized').then(mod => ({ default: mod.IdeaCardSkeleton })));

// Constants
const PAGE_SIZE = 12; // Number of items to load per page

const CATEGORIES = [
  'All',
  'Technology',
  'Food & Drink',
  'Health & Wellness',
  'Home & Living',
  'Travel',
  'Family & Kids',
  'Pets',
  'Business',
  'Gifts',
  'Automotive'
];

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalIdeas, setTotalIdeas] = useState(0);

  const fetchIdeas = useCallback(async (isNewSearch = false) => {
    setIsLoading(true);
    try {
      const currentPage = isNewSearch ? 1 : page;
      const data = await getIdeas({
        page: currentPage,
        pageSize: PAGE_SIZE,
        category: activeCategory,
        searchQuery: searchQuery,
      });
      
      setIdeas(prev => isNewSearch ? data.ideas : [...prev, ...data.ideas]);
      setTotalIdeas(data.total);
      setPage(currentPage);
      setHasMore(data.ideas.length > 0 && (isNewSearch ? data.ideas.length : ideas.length + data.ideas.length) < data.total);
    } catch (error) {
      console.error('Error loading ideas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, activeCategory, searchQuery, ideas.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIdeas([]);
      setPage(1);
      setHasMore(true);
      fetchIdeas(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  const loadMoreIdeas = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchIdeas();
    }
  }, [page]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const isFiltering = searchQuery.trim() || activeCategory !== 'All';

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Scene */}
      <Scene className="fixed inset-0 -z-10" />
      
      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-16">
          <div className="container mx-auto max-w-6xl">
            {/* Header Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full 
                bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white/70" />
                <span className="text-sm font-medium text-white/80">Startup Ideas Collection</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Big Idea
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Browse through our curated collection of innovative startup ideas. 
                Filter by category or search for specific keywords to find your perfect match.
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 
                  rounded-2xl blur-xl group-hover:from-white/10 group-hover:via-white/15 group-hover:to-white/10 
                  transition-all duration-500" />
                
                {/* Search input container */}
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 
                  hover:border-white/30 transition-all duration-300 shadow-2xl">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white/40 group-hover:text-white/60 transition-colors duration-200" />
                  </div>
                  
                  <Input
                    type="search"
                    placeholder="Search for innovative ideas..."
                    className="w-full py-6 pl-14 pr-6 text-base bg-transparent border-0 
                      focus:ring-2 focus:ring-white/30 focus:ring-offset-0 
                      text-white placeholder:text-white/50 font-medium tracking-wide
                      rounded-2xl focus:outline-none focus:bg-white/5 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Content Section */}
        <section className="relative px-4 pb-20">
          <div className="container mx-auto max-w-7xl">
            {/* Category Filters */}
            <Tabs
              defaultValue="All"
              className="w-full"
              onValueChange={handleCategoryChange}
            >
              {/* Filter Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 text-white/70">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter by category:</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
              </div>

              {/* Category Tabs */}
              <div className="mb-12">
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10" />
                  <div className="relative p-2">
                    <TabsList className="flex flex-wrap justify-center w-full bg-transparent p-0 gap-2">
                      {CATEGORIES.map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="relative px-5 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap
                            transition-all duration-300 data-[state=inactive]:text-white/70
                            data-[state=active]:text-white data-[state=inactive]:hover:text-white/90
                            data-[state=active]:bg-white/15 data-[state=active]:shadow-lg
                            data-[state=active]:shadow-white/10 data-[state=active]:border-white/20
                            data-[state=inactive]:hover:bg-white/8 border border-transparent
                            focus:outline-none focus:ring-2 focus:ring-white/30
                            backdrop-blur-sm bg-white/5 border border-white/10
                            hover:border-white/20 hover:bg-white/10
                            group"
                        >
                          {category}
                          {category === activeCategory && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl" />
                          )}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/5
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <span>
                    {isLoading && ideas.length === 0 ? (
                      "Searching..."
                    ) : (
                      <>
                        {totalIdeas} 
                        {totalIdeas === 1 ? ' idea' : ' ideas'} 
                        {isFiltering ? ' found' : ' available'}
                      </>
                    )}
                  </span>
                  {isFiltering && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      <span>
                        {searchQuery.trim() && `"${searchQuery}"`}
                        {searchQuery.trim() && activeCategory !== 'All' && ' in '}
                        {activeCategory !== 'All' && activeCategory}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
                  <span>Live updates</span>
                </div>
              </div>

              {/* Ideas Grid */}
              <TabsContent value={activeCategory} className="mt-0 focus:outline-none">
                <Suspense fallback={
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array(PAGE_SIZE).fill(0).map((_, i) => (
                      <IdeaCardSkeleton key={i} />
                    ))}
                  </div>
                }>
                  {(isLoading && ideas.length === 0) ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {Array(PAGE_SIZE).fill(0).map((_, i) => (
                        <IdeaCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : ideas.length > 0 ? (
                    <div className="space-y-8">
                      {/* Ideas Grid */}
                      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {ideas.map((idea) => (
                          <IdeaCardOptimized key={idea.id} {...idea} />
                        ))}
                      </div>

                      {/* Load More Section */}
                      {hasMore && (
                        <div className="flex justify-center pt-8">
                          <button 
                            onClick={loadMoreIdeas}
                            disabled={isLoading}
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl 
                              bg-white/5 backdrop-blur-lg border border-white/20 
                              hover:bg-white/10 transition-all duration-300 cursor-pointer
                              shadow-lg hover:shadow-xl hover:shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span className="text-white/80 font-medium">Loading...</span>
                              </>
                            ) : (
                              <span className="text-white/80 font-medium">Load More</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-lg border border-white/20 
                        flex items-center justify-center mb-6">
                        <Search className="w-6 h-6 text-white/40" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">
                        No ideas found
                        {searchQuery.trim() && (
                          <span className="block text-lg font-normal text-white/60 mt-1">
                            for &quot;{searchQuery}&quot;
                            {activeCategory !== 'All' && ` in ${activeCategory}`}
                          </span>
                        )}
                      </h3>
                      
                      <p className="text-white/60 max-w-md leading-relaxed mb-8">
                        Try adjusting your search terms or exploring different categories 
                        to discover innovative startup opportunities.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 justify-center">
                        {searchQuery.trim() && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 
                              text-white/80 hover:text-white transition-all duration-200 
                              border border-white/20 hover:border-white/30 text-sm font-medium"
                          >
                            Clear search
                          </button>
                        )}
                        {activeCategory !== 'All' && (
                          <button
                            onClick={() => setActiveCategory('All')}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 
                              text-white/80 hover:text-white transition-all duration-200 
                              border border-white/20 hover:border-white/30 text-sm font-medium"
                          >
                            Show all categories
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
}
