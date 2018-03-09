import { User } from "./user";
import { FieldValue } from "@firebase/firestore-types";

export type PostType = "complaint" | "problem";

export type PostStatus = "pending" | "inProgress" | "completed";

export interface Post {
  type: PostType;
  status: PostStatus;
  timestamp: Date | FieldValue;
  heading: string;
  description: string;
  user: User;
  commentCount?: number;
}
