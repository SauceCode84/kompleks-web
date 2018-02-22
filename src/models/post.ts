import { User } from "./user";

export type PostType = "complaint" | "problem";

export type PostStatus = "pending" | "inProgress" | "completed";

export interface Post {
  type: PostType;
  status: PostStatus;
  timestamp: Date;
  description: string;
  user: User;
  commentCount: number;
}
