type TUser = {
  email: string;
  password: string;
  role_id: number;
  status: "active" | "inactive" | "suspended"; // Thêm các trạng thái khác nếu có
  firt_name: string;
  last_name: string;
  gender: number | "male" | "female" | "other"; // Có thể thêm các giá trị khác nếu cần
  birthday: string; // Có thể dùng Date nếu muốn
  address: string;
  image_user: string;
  phone_number: string;
  user_id: number;
  date_create: string;
  date_update: string;
  id: string;
};
export default TUser;
