import TUser from "./TUsers";
type TComments = {
  comment_id: number;
  product_item_id: number;
  user_id: number;
  user: TUser;
  content: string;
  rating: number;
  reported: boolean;
  created_at: string;
  updated_at: string;
};
export default TComments;
