export interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

export interface IdeasResponse {
  ideas: Idea[];
  total: number;
}

export async function getIdeas({
  page = 1,
  pageSize = 12,
  category = 'All',
  searchQuery = ''
}: {
  page?: number;
  pageSize?: number;
  category?: string;
  searchQuery?: string;
}): Promise<IdeasResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (category && category !== 'All') {
      params.append('category', category);
    }

    if (searchQuery) {
      params.append('search', searchQuery);
    }

    const response = await fetch(`/api/ideas?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ideas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return { ideas: [], total: 0 };
  }
}