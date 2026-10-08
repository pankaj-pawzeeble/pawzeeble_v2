import type { CommunityPost, PostMedia, PostType } from './data';
import type { Pawst } from './types';

const mediaKind = (mimeType: string): PostMedia['kind'] => (mimeType.split('/')[0] === 'video' ? 'video' : 'image');

function postType(media: PostMedia[]): PostType {
  if (media.length === 0) return 'thought';
  const video = media[0].kind === 'video';
  if (media.length === 1) return video ? 'video' : 'image';
  return video ? 'multi_video' : 'multi_image';
}

/** Maps a feed pawst onto the card model. Soft-deleted comments are ignored for the count and the preview. */
export function pawstToPost(p: Pawst): CommunityPost {
  const media: PostMedia[] = (p.medias ?? []).map((m) => ({ kind: mediaKind(m.mimeType), url: m.url }));
  const comments = (p.comments ?? []).filter((c) => !c.deleted);
  const top = comments[0];
  const tagged = p.forPetIds?.[0];
  // The feed's tagged pets carry no name, so fall back to the author as the "pet" line.
  const pet = tagged?.name ? { name: tagged.name, avatarUrl: tagged.profilePic ?? p.profilePic ?? undefined } : { name: p.username, avatarUrl: p.profilePic ?? undefined };

  return {
    id: p._id,
    type: postType(media),
    pet,
    parent: tagged?.name ? { name: p.username } : undefined,
    createdAt: p.createdAt,
    text: p.words ?? '',
    media,
    likeCount: p.likedBy?.length ?? 0,
    commentCount: comments.length,
    topComment: top ? { pet: { name: top.username, avatarUrl: top.profilePic ?? undefined }, text: top.words, likeCount: top.likedBy?.length ?? 0 } : undefined,
  };
}
