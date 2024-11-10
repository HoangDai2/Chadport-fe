import TUser from "./TUsers";
type TComments = {
  comment_id: number;
  product_id: number;
  user_id: number;
  user: TUser;
  content: string;
  rating: number;
  like_count: number;
  dislike_count: number;
  reported: boolean;
  created_at: string;
  updated_at: string;
};
export default TComments;
