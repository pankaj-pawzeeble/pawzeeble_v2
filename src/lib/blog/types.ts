export interface Blog {
  _id: string;
  title: string;
  /** HTML short description. */
  desc: string;
  /** HTML article body. */
  blog: string;
  thumbImage?: string;
  coverImage?: string;
  /** ISO date. */
  publishedDate: string;
  tags?: string[];
  authorId?: { _id: string; name: string };
  enterpriseId?: { _id: string; name: string };
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Thumb {
  url: string;
  width?: number;
  height?: number;
}

export interface Vlog {
  ytUrl: string;
  videoId: string;
  title: string;
  /** Plain text; URLs are turned into links when displayed. */
  description: string;
  videoPublishedAt: string;
  thumbnails: { default?: Thumb; medium?: Thumb; high?: Thumb; standard?: Thumb; maxres?: Thumb };
}

export interface BusinessBlog {
  _id: string;
  title: string;
  desc: string;
  blogDesc?: string;
  blog: string;
  thumbImage?: string;
  coverImage?: string;
  publishedDate: string;
  authorId?: { _id: string; name: string };
  enterpriseId?: unknown;
  metadata?: { title?: string; keyword?: string; desc?: string };
  deleted?: boolean;
  createdAt?: string;
}

export interface BusinessVlog {
  _id: string;
  title?: string;
  desc?: string;
  url?: string;
  videoId?: string;
  publishedDate?: string;
  createdAt: string;
  enterpriseId?: unknown;
  metadata?: unknown;
  /** Playback, title and description come from here, not the top-level fields. */
  videoDetails: Vlog;
}

export interface Page<T> {
  records: T[];
  totalRecordCount: number;
}

export type FeedItem = { kind: 'blog'; blog: Blog; date: number } | { kind: 'vlog'; vlog: Vlog; date: number };
