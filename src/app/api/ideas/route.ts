import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

function getIdeasFromFile(): Idea[] {
  try {
    const filePath = path.join(process.cwd(), 'IDEAS.md');
    const content = fs.readFileSync(filePath, 'utf8');
    
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const ideas: Idea[] = [];
    
    let currentId = 1;
    for (const line of lines) {
      if (line.startsWith('#') || !/^\d+\.\s+.+/.test(line)) continue;
      
      const ideaText = line.replace(/^\d+\.\s*/, '').trim();
      const titleWords = ideaText.split(' ').slice(0, 5).join(' ');
      const title = titleWords.endsWith('.') ? titleWords.slice(0, -1) : titleWords;
      
      // Simple categorization based on keywords
      let category = 'General';
      const lowerText = ideaText.toLowerCase();
      
      if (lowerText.includes('app') || lowerText.includes('feature') || lowerText.includes('website')) {
        category = 'Technology';
      } else if (lowerText.includes('food') || lowerText.includes('restaurant') || lowerText.includes('recipe')) {
        category = 'Food & Drink';
      } else if (lowerText.includes('health') || lowerText.includes('fitness') || lowerText.includes('wellness')) {
        category = 'Health & Wellness';
      } else if (lowerText.includes('home') || lowerText.includes('house') || lowerText.includes('living')) {
        category = 'Home & Living';
      } else if (lowerText.includes('travel') || lowerText.includes('trip') || lowerText.includes('vacation')) {
        category = 'Travel';
      } else if (lowerText.includes('kids') || lowerText.includes('children') || lowerText.includes('baby')) {
        category = 'Family & Kids';
      } else if (lowerText.includes('pet') || lowerText.includes('dog') || lowerText.includes('cat')) {
        category = 'Pets';
      } else if (lowerText.includes('business') || lowerText.includes('startup') || lowerText.includes('entrepreneur')) {
        category = 'Business';
      } else if (lowerText.includes('gift') || lowerText.includes('present') || lowerText.includes('holiday')) {
        category = 'Gifts';
      } else if (lowerText.includes('car') || lowerText.includes('vehicle') || lowerText.includes('drive')) {
        category = 'Automotive';
      }
      
      // Extract potential keywords
      const commonWords = new Set([
        'the', 'and', 'for', 'you', 'your', 'that', 'with', 'this', 'from', 'have', 'would', 'could', 'should',
        'will', 'when', 'where', 'what', 'which', 'who', 'whom', 'whose', 'why', 'how', 'about', 'into', 'over',
        'under', 'above', 'below', 'between', 'through', 'after', 'before', 'during', 'since', 'until', 'while'
      ]);
      
      const keywords = ideaText
        .toLowerCase()
        .split(/[^\w']+/)
        .filter(word => 
          word.length > 3 && 
          !commonWords.has(word) && 
          !/^\d+$/.test(word)
        )
        .slice(0, 5);
      
      ideas.push({
        id: currentId++,
        title: title.length > 50 ? `${title.substring(0, 47)}...` : title,
        description: ideaText,
        category,
        keywords: [...new Set(keywords)].slice(0, 3)
      });
    }
    
    return ideas;
  } catch (error) {
    console.error('Error reading ideas file:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('search');

    let allIdeas = getIdeasFromFile();

    if (category && category !== 'All') {
      allIdeas = allIdeas.filter(idea => idea.category === category);
    }

    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase().trim();
      allIdeas = allIdeas.filter(idea => 
        idea.title.toLowerCase().includes(searchTerm) ||
        idea.description.toLowerCase().includes(searchTerm) ||
        idea.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedIdeas = allIdeas.slice(startIndex, endIndex);
    
    return NextResponse.json({
      ideas: paginatedIdeas,
      total: allIdeas.length,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to load ideas' },
      { status: 500 }
    );
  }
}