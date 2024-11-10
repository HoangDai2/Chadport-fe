type TUser = {
  email: string;
  password: string;
  role_id: number;
  status: "active" | "inactive" | "suspended"; // Thêm các trạng thái khác nếu có
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other"; // Có thể thêm các giá trị khác nếu cần
  birthday: string; // Có thể dùng Date nếu muốn
  address: string;
  img_user: string;
  phonenumber: string;
  user_id: number;
  date_create: string;
  date_update: string;
  id: string;
};
export default TUser;
