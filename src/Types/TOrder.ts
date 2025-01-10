import TUser, { AddressData } from "./TUsers";

type PaymentData = {
  payment_method: "1" | "2";
  phone: string;
  email: string;
  shipping_address: TUser & AddressData;
  billing_address: string;
};
export default PaymentData;
