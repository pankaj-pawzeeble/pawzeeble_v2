/** Wire types for the community (`cn/...`) API. Every mutation returns the whole updated pawst. */

export interface LikedBy {
  _id: string;
  byId: string;
  username: string;
  profilePic?: string | null;
  name?: string;
}

/** The feed endpoint only returns `petId` + `profilePic`; `name`/`username` appear on other endpoints. */
export interface ForPet {
  petId: string;
  name?: string;
  username?: string;
  profilePic?: string | null;
}

export interface PawstMedia {
  url: string;
  mimeType: string;
}

export interface Reply {
  _id: string;
  byId: string;
  username: string;
  profilePic?: string | null;
  level: 2;
  words: string;
  deleted: boolean;
  likedBy: LikedBy[];
  comments: [];
  createdAt: string;
  updatedAt: string;
}

export interface PawstComment {
  _id: string;
  byId: string;
  username: string;
  profilePic?: string | null;
  level: 1;
  words: string;
  deleted: boolean;
  likedBy: LikedBy[];
  comments: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Pawst {
  _id: string;
  byId: string;
  username: string;
  profilePic?: string | null;
  forPetIds: ForPet[];
  level: 0;
  medias: PawstMedia[];
  words?: string;
  deleted: boolean;
  link: string;
  likedBy: LikedBy[];
  comments: PawstComment[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type CnOk<T> = { success: true; message: string; data: T };
export type CnFail = { success: false; message: string; data: null };
/** Services never throw (except `uploadPawst`): branch on `success`. */
export type CnResult<T> = CnOk<T> | CnFail;

export type ReportReason =
  | 'spam_scam'
  | 'misleading_harmful_advice'
  | 'animal_cruelty'
  | 'offensive_disrespectful'
  | 'off_topic'
  | 'other';

export interface ReportPayload {
  postId: string;
  reason: ReportReason;
  reportedUserId: string;
  contentType: 'pawst';
  otherReason?: string;
}

export interface ToggleLikePayload {
  /** 1 = like, 0 = unlike */
  state: 0 | 1;
  pawst_id: string;
  comment_id?: string;
  reply_id?: string;
}
