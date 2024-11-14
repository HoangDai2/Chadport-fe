import * as Yup from "yup";

// Validation Schema cho đăng nhập
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập Email"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái viết thường")
    .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số")
    .matches(/[@$!%*?&]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt")
    .required("Vui lòng nhập Mật khẩu"),
});

// Validation Schema cho đăng ký
const registerValidationSchema = Yup.object({
  firt_name: Yup.string()
    .required("Vui lòng nhập Tên")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên chỉ được chứa các ký tự chữ cái"),
  last_name: Yup.string()
    .required("Vui lòng nhập Họ")
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ chỉ được chứa các ký tự chữ cái"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập Email"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái viết thường")
    .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số")
    .matches(/[@$!%*?&]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt")
    .required("Vui lòng nhập Mật khẩu"),
});
const profileValidationSchema = Yup.object({
  phone_number: Yup.string()
    .matches(/^\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  gender: Yup.number()
    .oneOf([1, 2, 3], "Select a valid gender")
    .required("Gender is required"),
  birthday: Yup.date().required("Birthdate is required"),
  address: Yup.string().required("Address is required"),
});
export {
  loginValidationSchema,
  registerValidationSchema,
  profileValidationSchema,
};
