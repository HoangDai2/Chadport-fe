type TUser = {
  user_id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other"; // Có thể thêm các giá trị khác nếu cần
  birthday: string; // Có thể dùng Date nếu muốn
  address: string;
  img_user: string;
  phonenumber: string;
  email: string;
  password: string;
  status: "active" | "inactive" | "suspended"; // Thêm các trạng thái khác nếu có
  date_create: string; // Có thể dùng Date nếu cần
  date_update: string; // Có thể dùng Date nếu cần
  id: string;
};
export default TUser;
