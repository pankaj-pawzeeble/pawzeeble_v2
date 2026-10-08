/**
 * Community feed types, helpers and SAMPLE content.
 * The public-posts and clan-list endpoints are not defined yet, so `SAMPLE_POSTS` and
 * `SAMPLE_CLANS` stand in for the API. Replace `getCommunityFeed()` when they exist.
 */

export type PostType = 'image' | 'video' | 'multi_image' | 'multi_video' | 'thought';

export interface PostMedia {
  kind: 'image' | 'video';
  url: string;
  posterUrl?: string;
  durationSec?: number;
}

export interface CommunityPost {
  id: string;
  type: PostType;
  pet: { name: string; avatarUrl?: string };
  parent: { name: string };
  location: { area: string; city: string };
  createdAt: string;
  clan?: { name: string };
  text: string;
  media: PostMedia[];
  likeCount: number;
  commentCount: number;
  topComment?: { pet: { name: string; avatarUrl?: string }; text: string; likeCount: number };
}

export interface Clan {
  id: string;
  name: string;
  avatarUrl?: string;
}

export const CAPTION_LIMIT = 150;

/** Cuts at the last word boundary within the limit and appends an ellipsis. */
export function truncateCaption(text: string, limit = CAPTION_LIMIT): { short: string; truncated: boolean } {
  if (text.length <= limit) return { short: text, truncated: false };
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return { short: (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…', truncated: true };
}

/** 12m / 2h / 1d / 3d */
export function timeAgo(iso: string, now = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

/** m:ss */
export function formatDuration(sec = 0): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

export const SAMPLE_CLANS: Clan[] = ['Labrador', 'GSD', 'Pug', 'Golden Retriever', 'Shih Tzu', 'Beagle', 'Indie', 'Husky', 'Persian Cat', 'Rottweiler'].map(
  (name) => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name }),
);

const img = (n = 1): PostMedia[] => Array.from({ length: n }, () => ({ kind: 'image', url: '' }));
const vid = (n = 1): PostMedia[] => Array.from({ length: n }, (_, i) => ({ kind: 'video', url: '', posterUrl: '', durationSec: 24 + i * 11 }));
const comment = (pet: string, text: string, likeCount: number) => ({ pet: { name: pet }, text, likeCount });

export const SAMPLE_POSTS: CommunityPost[] = [
  { id: 'p1', type: 'image', pet: { name: 'Bruno' }, parent: { name: 'Aarav' }, location: { area: 'Baner', city: 'Pune' }, createdAt: hoursAgo(2), clan: { name: 'Labrador' },
    text: 'First beach day for this goofball. He ran straight into the waves and refused to come out for an hour. Zero regrets, sandy car seats everywhere.', media: img(),
    likeCount: 128, commentCount: 14, topComment: comment('Coco', 'That grin says it all!', 9) },
  { id: 'p2', type: 'thought', pet: { name: 'Mochi' }, parent: { name: 'Isha' }, location: { area: 'Bandra', city: 'Mumbai' }, createdAt: hoursAgo(5),
    text: 'Reminder: a tired dog is a happy dog, but a mentally stimulated dog is a calm one. Sniff walks count as exercise too.', media: [],
    likeCount: 342, commentCount: 41, topComment: comment('Simba', 'Sniff walks changed our evenings.', 27) },
  { id: 'p3', type: 'video', pet: { name: 'Luna' }, parent: { name: 'Riya' }, location: { area: 'Indiranagar', city: 'Bengaluru' }, createdAt: hoursAgo(9), clan: { name: 'Persian Cat' },
    text: 'Zoomies at 3am, as per tradition.', media: vid(),
    likeCount: 87, commentCount: 6 },
  { id: 'p4', type: 'multi_image', pet: { name: 'Zeus' }, parent: { name: 'Kabir' }, location: { area: 'Koramangala', city: 'Bengaluru' }, createdAt: hoursAgo(14), clan: { name: 'GSD' },
    text: 'Weekend trek with the whole pack. Zeus led from the front for all 6 km and then slept through dinner. Swipe for the summit photo!', media: img(3),
    likeCount: 211, commentCount: 22, topComment: comment('Rocky', 'Epic views, epic boy.', 14) },
  { id: 'p5', type: 'thought', pet: { name: 'Pixel' }, parent: { name: 'Neha' }, location: { area: 'Salt Lake', city: 'Kolkata' }, createdAt: hoursAgo(20),
    text: 'Adopt, don’t shop. Our Indie came from a rescue drive and has not stopped teaching us about patience since.', media: [],
    likeCount: 509, commentCount: 63, topComment: comment('Daisy', 'Indies are the best. Fight me.', 51) },
  { id: 'p6', type: 'multi_video', pet: { name: 'Oreo' }, parent: { name: 'Meera' }, location: { area: 'Jubilee Hills', city: 'Hyderabad' }, createdAt: hoursAgo(30), clan: { name: 'Pug' },
    text: 'Training progress this week: sit, paw and, finally, a very dramatic roll-over. Treat budget is officially blown.', media: vid(2),
    likeCount: 156, commentCount: 18, topComment: comment('Biscuit', 'The roll-over!!', 7) },
  { id: 'p7', type: 'image', pet: { name: 'Simba' }, parent: { name: 'Dev' }, location: { area: 'Powai', city: 'Mumbai' }, createdAt: hoursAgo(44), clan: { name: 'Indie' },
    text: 'Vet visit done, vaccines up to date and a clean bill of health. Brave boy got extra chicken.', media: img(),
    likeCount: 94, commentCount: 8, topComment: comment('Bruno', 'Good boy!', 3) },
  { id: 'p8', type: 'video', pet: { name: 'Milo' }, parent: { name: 'Tara' }, location: { area: 'Aundh', city: 'Pune' }, createdAt: hoursAgo(52), clan: { name: 'Beagle' },
    text: 'He found the one muddy puddle in the whole park. Of course he did.', media: vid(),
    likeCount: 133, commentCount: 11 },
  { id: 'p9', type: 'multi_image', pet: { name: 'Cleo' }, parent: { name: 'Sana' }, location: { area: 'Vasant Kunj', city: 'Delhi' }, createdAt: hoursAgo(60), clan: { name: 'Husky' },
    text: 'Grooming day glow-up. Fluff level: maximum.', media: img(4),
    likeCount: 275, commentCount: 29, topComment: comment('Max', 'Look at that coat!', 19) },
  { id: 'p10', type: 'thought', pet: { name: 'Biscuit' }, parent: { name: 'Arjun' }, location: { area: 'Adyar', city: 'Chennai' }, createdAt: hoursAgo(72),
    text: 'Traveling with a pet? Book pet-friendly stays early, carry their vaccination records, and pack a familiar blanket.', media: [],
    likeCount: 188, commentCount: 20, topComment: comment('Luna', 'The blanket tip is gold.', 12) },
  { id: 'p11', type: 'image', pet: { name: 'Daisy' }, parent: { name: 'Pooja' }, location: { area: 'Viman Nagar', city: 'Pune' }, createdAt: hoursAgo(80), clan: { name: 'Golden Retriever' },
    text: 'Birthday boy turns three today! Pup cake demolished in under a minute.', media: img(),
    likeCount: 402, commentCount: 47, topComment: comment('Zeus', 'Happy birthday!', 33) },
  { id: 'p12', type: 'multi_image', pet: { name: 'Rocky' }, parent: { name: 'Vikram' }, location: { area: 'Gachibowli', city: 'Hyderabad' }, createdAt: hoursAgo(96), clan: { name: 'Rottweiler' },
    text: 'Pet event at the park this weekend: agility course, a photo booth and a very large sausage stall.', media: img(2),
    likeCount: 119, commentCount: 15 },
];

export const UNLOCK_TOPICS = [
  'Pet grooming', 'Adoption & rescue', 'Pet event', 'Pet exercises', 'Pet news',
  'Pet products', 'Pet care', 'Pet care tips', 'Pet travel', 'Pet diet & nutrition',
];

/** Placeholder until the public-posts / clan-list endpoints exist. */
export async function getCommunityFeed(): Promise<{ posts: CommunityPost[]; clans: Clan[] }> {
  return { posts: SAMPLE_POSTS, clans: SAMPLE_CLANS };
}
