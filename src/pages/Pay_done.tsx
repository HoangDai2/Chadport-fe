import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const Pay_done = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    const extraData = params.get("extraData")
      ? JSON.parse(
          Buffer.from(params.get("extraData"), "base64").toString("utf-8")
        )
      : {};

    return {
      orderId: params.get("orderId"),
      amount: params.get("amount"),
      message: params.get("message"),
      ...extraData,
      date_create: new Date().toISOString(),
    };
  };

  useEffect(() => {
    const billDetails = getQueryParams(location.search);

    if (billDetails.message === "Successful.") {
      const saveBillToDB = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/bills",
            billDetails
          );
          console.log("Bill Luu thanh cong:", response.data);
        } catch (error) {
          console.error("loi luu bill:", error);
        }
      };
      saveBillToDB();
    } else {
      alert("Thanh toán không thành công.");
    }

    const timer = setTimeout(() => {
      navigate("/billorder");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.search, navigate]);

  return (
    <div>
      <h1>Thanh toán thành công</h1>
      <p>Đang chuyển hướng về trang chủ...</p>
    </div>
  );
};

export default Pay_done;
