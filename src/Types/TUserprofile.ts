import TUser from "./TUsers";

export const getInitialFormData = (user: TUser | null): TUser => {
  return Object.assign(
    {
      email: "",
      password: "",
      role_id: 0,
      status: "active" as "active",
      firt_name: "",
      last_name: "",
      gender: "other" as "male" | "female" | "other",
      birthday: "",
      address: "",
      image_user: "",
      phonenumber: "",
      user_id: 0,
      date_create: "",
      date_update: "",
      id: "",
    },
    user || {}
  );
};
