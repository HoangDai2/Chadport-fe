import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import pay_done from "../img/pay_done.png";
// import pay_err from "../img/payment_err.webp";
import axios from "axios";

const PayDone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const message = queryParams.get("message") || "Payment Successful";
  const code = queryParams.get("code");
  const orderId = queryParams.get("order_id");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(queryParams);
  //
  // Trigger toast notifications on load
  useEffect(() => {
    if (code === "00") {
      toast.success("Payment Successful!");
    } else {
      toast.error("Payment Failed. Please try again!");
    }
  }, [code]);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/all-ordersAdmin/${orderId}`
        );
        setOrderDetails(response.data.data);
        // console.log(response.data.data);
        // toast.success("Order details fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch order details.");
        // console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!orderDetails) {
    return (
      <div className="text-center text-red-500 mt-10">Order not found.</div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-3 mb-3 bg-gray-50 px-6">
      {/* Toast Container */}
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center p-8 w-full max-w-5xl">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1
            className={`text-3xl font-bold ${code === "00" ? "text-green-600" : "text-red-600"
              } mb-4`}
          >
            {message}
          </h1>
          <p className="text-gray-500 mb-8">
            {code === "00"
              ? `Your order (ID: ${orderId}) has been processed successfully. Thank you for choosing our service. Your custom reports will be generated within two business days.`
              : "Something went wrong. Please try again."}
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center md:justify-start mb-8">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full ${code === "00" ? "bg-green-500" : "bg-gray-300"
                    } flex items-center justify-center text-white text-sm font-bold`}
                >
                  ✓
                </div>
                <p className="text-sm text-gray-600 mt-2">Sites selected</p>
              </div>
              <div
                className={`w-16 h-1 mb-3 ${code === "00" ? "bg-green-500" : "bg-gray-300"
                  } mx-2 self-center`}
              ></div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full ${code === "00" ? "bg-green-500" : "bg-gray-300"
                    } flex items-center justify-center text-white text-sm font-bold`}
                >
                  ✓
                </div>
                <p className="text-sm text-gray-600 mt-2">Payment received</p>
              </div>
              <div className="w-16 h-1 mb-3 bg-gray-300 mx-2 self-center"></div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
                  3
                </div>
                <p className="text-sm  text-gray-600 mt-2">Processing report</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4">
            {code === "00" && (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={() => navigate("/profile")}
              >
                Views Bill
              </button>
            )}
            <button
              className="border border-green-500 text-green-500 py-2 px-4 rounded-md hover:bg-green-100 transition"
              onClick={() => navigate("/")}
            >
              Back Home
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          {/* <img
            src={code === "00" ? pay_done : pay_err}
            alt="Payment Status Illustration"
            className="w-72 h-auto"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PayDone;
