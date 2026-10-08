import { useState } from 'react';
import { timeAgo, truncateCaption, type CommunityPost } from '@/lib/community/data';
import styles from './Community.module.css';
import { CommentIcon, HeartIcon, MoreVerticalIcon, SendIcon, SmileIcon, UserIcon } from './CommunityIcons';
import { useDownloadGate } from './DownloadGate';
import MediaCarousel from './MediaCarousel';

const nameStyle = { fontSize: '15px', fontWeight: 700, color: '#2B2342', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } as const;

function Avatar({ url, size, bg, border }: { url?: string; size: number; bg: string; border?: string }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: bg, border }}>
      {url ? (
        <img src={url} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : null}
    </span>
  );
}

export default function PostCard({ post }: { post: CommunityPost }) {
  const { lock } = useDownloadGate();
  const [expanded, setExpanded] = useState(false);

  const { short, truncated } = truncateCaption(post.text);
  const isThought = post.type === 'thought';
  const comment = post.topComment;

  return (
    <article style={{ background: '#fff', border: '1.5px solid #EFEAF8', borderRadius: '24px', overflow: 'hidden' }}>
      {/* header */}
      <div style={{ padding: '14px 12px 14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar url={post.pet.avatarUrl} size={44} bg="#F2EEFA" border="2px solid #E3DDF6" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={nameStyle}>{post.pet.name} • {post.parent.name}</div>
          <div style={{ marginTop: '2px', fontSize: '12.5px', color: '#6F6590', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post.location.area}, {post.location.city} · <span suppressHydrationWarning>{timeAgo(post.createdAt)}</span>
          </div>
        </div>
        {post.clan ? (
          <span style={{ flex: 'none', background: '#FFF1E4', color: '#A44A00', fontSize: '12px', fontWeight: 700, padding: '5px 10px', borderRadius: '999px' }}>{post.clan.name}</span>
        ) : null}
        <button onClick={() => lock('see more options')} aria-label="More options" className={styles.iconBtn} style={{ flex: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#5A5177' }}>
          <MoreVerticalIcon />
        </button>
      </div>

      {/* body */}
      {post.text ? (
        isThought ? (
          <div style={{ margin: '0 16px 16px', background: '#F7F4FD', border: '1.5px solid #EFEAF8', borderRadius: '18px', padding: 'clamp(20px, 4vw, 28px)' }}>
            <p style={{ fontSize: 'clamp(17px, 2.6vw, 19px)', fontWeight: 700, lineHeight: 1.5, color: '#2B2342' }}>{post.text}</p>
          </div>
        ) : (
          <p style={{ padding: '0 16px 14px', fontSize: '15px', lineHeight: 1.6, color: '#2B2342' }}>
            {expanded || !truncated ? post.text : short}
            {truncated ? (
              <>
                {' '}
                <button onClick={() => setExpanded((e) => !e)} className={styles.toggle} style={{ fontSize: '15px', fontWeight: 700, color: '#6351A1' }}>
                  {expanded ? 'show less' : 'show more'}
                </button>
              </>
            ) : null}
          </p>
        )
      ) : null}
      {!isThought ? <MediaCarousel media={post.media} /> : null}

      {/* actions */}
      <div style={{ borderTop: '1.5px solid #F2EEFA', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button onClick={() => lock('like this post')} className={styles.actionBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, color: '#5A5177' }}>
          <HeartIcon size={22} />
          {post.likeCount} Likes
        </button>
        <button onClick={() => lock('comment on this post')} className={styles.actionBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, color: '#5A5177' }}>
          <CommentIcon size={21} />
          {post.commentCount} Comments
        </button>
        <button onClick={() => lock('share this post')} aria-label="Share" className={styles.actionBtn} style={{ marginLeft: 'auto', width: '40px', height: '40px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#5A5177' }}>
          <SendIcon />
        </button>
      </div>

      {/* top comment */}
      {comment ? (
        <div style={{ borderTop: '1.5px solid #F2EEFA', padding: '14px 12px 12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Avatar url={comment.pet.avatarUrl} size={40} bg="#FFF1E4" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2B2342' }}>{comment.pet.name}</div>
            <p style={{ marginTop: '2px', fontSize: '14px', lineHeight: 1.5, color: '#2B2342' }}>{comment.text}</p>
            <div style={{ marginTop: '6px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <button onClick={() => lock('reply to comments')} className={styles.toggle} style={{ fontSize: '13.5px', fontWeight: 700, color: '#6351A1' }}>Reply</button>
              <button onClick={() => lock('see more options')} aria-label="More options" style={{ fontSize: '13.5px', color: '#6F6590' }}>···</button>
            </div>
          </div>
          <button onClick={() => lock('like this post')} aria-label="Like comment" style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: '#6F6590' }}>
            <HeartIcon size={18} />
            <span style={{ fontSize: '12.5px' }}>{comment.likeCount}</span>
          </button>
        </div>
      ) : null}

      {/* footer */}
      <div style={{ borderTop: '1.5px solid #F2EEFA', padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button onClick={() => lock('read all comments')} className={styles.link} style={{ alignSelf: 'flex-start', fontSize: '14px', fontWeight: 700, color: '#CA5C00' }}>View all comments</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ flex: 'none', width: '38px', height: '38px', borderRadius: '50%', background: '#F2EEFA', color: '#6351A1', display: 'grid', placeItems: 'center' }}>
            <UserIcon size={20} />
          </span>
          <button onClick={() => lock('comment on this post')} className={styles.commentBox} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: '#F7F4FD', border: '1.5px solid #EFEAF8', borderRadius: '999px', padding: '10px 16px 10px 12px', color: '#6F6590', textAlign: 'left' }}>
            <SmileIcon size={18} />
            <span style={{ flex: 1, fontSize: '14px' }}>Add a comment…</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Post</span>
          </button>
        </div>
      </div>
    </article>
  );
}
