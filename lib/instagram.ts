export interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: string;
  caption?: string;
  sizes: {
    medium: { width: number; height: number; mediaUrl: string };
  };
}

export async function fetchInstagramFeed(url: string): Promise<BeholdPost[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}
